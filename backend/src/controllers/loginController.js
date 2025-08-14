import customersModel from "../models/Clients.js"
import employeesModel from "../models/Employees.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js"

//creamos un array de funciones

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        //Validamos los 3 posibles niveles
        //1. Admin, 2. Empleado, 3. Cliente

        let userFound;
        let userType;

        //1. Admin
        if (email === config.ADMIN.emailAdmin && password === config.ADMIN.password) {
            userType = "admin";
            userFound = { _id: "admin" }
        } else {
            //2. Empleados
            userFound = await employeesModel.findOne({ email });
            userType = "employee"
            if (!userFound) {
                //3. Cliente
                userFound = await customersModel.findOne({ email });
                userType = "customer"
            }
        }
        //Si no encontramos a ningun usuario con esas credenciales
        if (!userFound) {
            return res.json({ message: "User not found" });
        }


        //primero verificamos si el usuario esta bloqueado
        if(userType !== "Admin"){
            if(userFound.timeOut > Date.now()){
                const minutosRestantes = Math.ceil(userFound.timeOut - Date.now()/60000);
            
                res.status(403).json({ message: "Cuenta bloqueada, faltan" + minutosRestantes})
            }
        }


        //Validar la contraseña
        // SOLO DI NO ES ADMIN

        if (userType !== "admin") {
            const isMatch = await bcryptjs.compare(password, userFound.password);
            if (!isMatch) {


                //si se equivoca en  la contraseña vamos a sumar 1 al contador de intentos fallidos
                userFound.loginAttempts = userFound.loginAttempts + 1;

                if(userFound.loginAttempts >= 3){
                    userFound.timeOut = Date.now() + 5 * 60 * 1000;

                    userFound.loginAttempts = 0
                    await userFound.save()

                    return res.status(403).json({ message: "Cuenta bloqueada"})
                }

                await userFound.save()
                return res.json({ message: "Invalid password" })
            }
            userFound.loginAttempts = 0
            userFound.timeOut = null
            await userFound.save()
        }


        //TOKEN
        //Para validar que inicio sesion
        jsonwebtoken.sign(
            //1 que voy a guardar
            { id: userFound._id, userType },
            //2- secreto
            config.JWT.secret,
            //3- Cuando expira
            { expiresIn: config.JWT.expiresIn },
            //4- Funcion flecha
            (error, token) => {
                if (error) console.log("error" + error)

                res.cookie("authToken", token)
                res.json({ message: "Login successful" })
            } 
        )

    } catch (error) {
        console.log("error" + error)
        res.json({ message: "Error login" })
    }
};


export default loginController;