import clientsModel from "../models/Clients.js"
import nodemailer from "nodemailer";
import crypto from "crypto"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js"


const registerClientController = {};

registerClientController.registerClient = async (req, res) => {
    const {
        name,
        lastName,
        birthday,
        email,
        password,
        telephone,
        dui,
        isVerified,
    } = req.body;

    try {
        // Verificar si el cliente ya existe
        const existClient = await clientsModel.findOne({ email })
        if (existClient) {
            return res.json({ message: "Client already exist" })
        }

        // Encriptar la contraseña

        const passwordHash = await bcryptjs.hash(password, 10)

        // Guardamos el cliente en la base de datos

        const newClient = new clientsModel({
            name,
            lastName,
            birthday,
            email,
            password,
            telephone,
            dui: dui || null,
            isVerified: isVerified || false,
        });
        await newClient.save();
        res.json({ message: "client saved" });

        // Generar codigo de verificacion
        const verificationCode = crypto.randomBytes(3).toString("hex")
        const expiresAt = Dato.now() + 1 * 60 * 60 * 1000; // 2 horas

        //TOKEN
        //Para validar que inicio sesion
        jsonwebtoken.sign(
            //1 que voy a guardar
            { email, verificationCode, expiresAt },
            //2- secreto
            config.JWT.secret,
            //3- Cuando expira
            { expiresIn: config.JWT.expiresIn },
            //4- Funcion flecha
            (error, token) => {
                if (error) console.log("error" + error)

                res.cookie("verificationToken", token, { maxAge: 1 * 60 * 60 * 1000}) // Despues de el "token" ponga coma y para asegurar el token escriba: { httpsOnly : true }
                res.json({ message: "Register successful" })
            }
        )

        // Enviar correo

    } catch (error) {
        console.log("error" + error)
        res.json({ message: "Error registerClient" })
    }
}