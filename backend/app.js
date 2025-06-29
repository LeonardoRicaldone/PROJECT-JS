//express es un servidor que me dara una red

//importo todo lo de la libreria de express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import branchesRoutes from "./src/routes/branches.js"
import reviewsRoutes from "./src/routes/reviews.js";
import employeesRoutes from "./src/routes/employees.js"
import registerEmployeesRoutes from "./src/routes/registerEmployees.js"
import cookieParser from "cookie-parser";
import loginRoutes from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js"
import registerClientRoutes from "./src/routes/registerClients.js"
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js"
import providersRoutes from "./src/routes/providers.js";
import faqsRoutes from "./src/routes/faqs.js";
import salesRouter from "./src/routes/sales.js";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import path from "path";
import {validateAuthToken } from "./src/middleware/validateAuthToken.js";

//crear constante que es igual a la libreria que importe
const app = express();

//usamos cors
app.use(
    cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

//traemos el archivo json
const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve("./DocumentacionZonaDigital.json"), "utf-8")
)

//Que acepte datos de json
app.use(express.json());
//Que postman acepte guardar cookies
app.use(cookieParser())

//Definir las rutas de las funciones que tendra la pagina web
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use("/api/products", validateAuthToken(["admin"]), productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/sales", salesRouter);
app.use("/api/registerEmployees", registerEmployeesRoutes)
app.use("/api/login", loginRoutes)
app.use("/api/logout", logoutRoutes)
app.use("/api/registerClients", registerClientRoutes)

app.use("/api/recoveryPassword", recoveryPasswordRoutes)

app.use("/api/providers",  providersRoutes)
app.use("/api/faqs", faqsRoutes);


//exporto la constante para poder usar express en otros archivos
export default app;
//ESCRIBIR UNA LINEA ADICIONAL EN EL package.json hasta arriba   [  "type": "module",  ] es la linea y tambien en scripts "dev": "nodemon index.js"
