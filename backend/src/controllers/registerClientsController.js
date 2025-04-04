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
            password: passwordHash,
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

                res.cookie("verificationToken", token, { maxAge: 1 * 60 * 60 * 1000 }) // Despues de el "token" ponga coma y para asegurar el token escriba: { httpsOnly : true }
                res.json({ message: "Register successful" })
            }
        )

        // Enviar correo
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user,
                pass: config.email.pass
            }
        })

        // 2 Option: A quien se lo voy a enviar

        const mailOptions = {
            from: config.email.user,
            to: email,
            subject: "Verificacion de correo",
            text: `Hola mundo ${verificationCode}\n Este codigo expira en dos horas XD\n`
        }

        // Envio del correo

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log("error" + error)
            res.json({ message: "Email send" })
        })

        res.json({ message: "Client registered, please verify your email" })


    } catch (error) {
        console.log("error" + error)
        res.json({ message: "Error registerClient" })
    }
}

registerClientController.verifyCodeEmail = async (req, red) => {
    const { verificationCode } = req.body;
    // Accedemos al token "verificacion token"
    // ya que este contiene, el email, el codigo de verificacion y cuando expira
    const token = req.cookies.verificationCode;

    if (!token) {
        return res.json({ message: "Please register your account first" })
    }

    try {
        //Verificamos y decodificar el token
        // para obtener el email y el codigo de verificacion
        // que acabos de guardar al momento de registrar
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const { email, verificationCode: storedCode } = decoded;

        // Comparar el codigo recivido con el almacenado en el token
        if (verificationCode !== storedCode) {
            return res.json({
                message: "Invalid verification code"
            })
        }

        // Busco al cliente
        const client = await clientsModel.findOne({ email })
        if (!client) {
            return res.json({ message: "Client not found" })
        }

        // A ese cliente le cambio el campo "isVerified" a true
        client.isVerified = true,
        await client.save();

        res.clearCookie("verificationToken")
        res.json({message: "Email verified successfully"})
    } catch (error) {
        console.log("error" + error)
        res.json({ message: "Error Verified Client" })
    }
}