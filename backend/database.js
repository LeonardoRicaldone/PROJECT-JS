
//importamos el ORM
import mongoose from "mongoose";

// 1- configuro la URI o direccion de la base de datos
const URI = "mongodb://localhost:27017/ZonaDigicalDB20230070";

//2- Conecto la base de datos
mongoose.connect(URI);

// Comprobar todo

//3- Creo una constante que es igual a la conexion
const connection = mongoose.connection;

connection.once("open", () => console.log("DB is connected"));

//veo si se desconecto
connection.on("disconnected", () => console.log("DB is disconnected"));

//veo si hay un error
connection.on("error", (error) => console.log("DB error found" + error));
