import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";


import clientsModel from "../models/Clients.js";
import employeesModel from "../models/Employees.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery";

const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) => {
    const { email } = req.body;


    try {
        let userFound;
        let usertType;

        userFound = await clientsModel.findOne({ email });

        if(userFound) {
            usertType = "client";
        } else {
            userFound = await employeesModel.findOne({ email });
            if(userFound) {
                usertType = "employee";
            }
        }

        if (!userFound) {
            return res.json({ message: "Usuario no encontrado" });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        const token = jsonwebtoken.sign(
            { email, code, usertType, verified: false },
            config.JWT.secret,
             { expiresIn: "20" });

             res.cookie("tokenRecoveryCode", token, {
                maxAge: 20 * 60 * 1000,
             });

             await sendEmail(
                email,
                "Código de recuperación de contraseña",
                `Tu código de recuperación es: ${code}`,
                HTMLRecoveryEmail(code)
             );

    } catch (error) {
        console.error("Error en la solicitud de código:", error);
        res.json({ message: "Error al solicitar el código de recuperación" });
        
    }
}

export default passwordRecoveryController;