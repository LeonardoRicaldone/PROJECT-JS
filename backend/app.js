//express es un servidor que me dara una red

//importo todo lo de la libreria de express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import branchesRoutes from "./src/routes/branches.js"
import reviewsRoutes from "./src/routes/reviews.js";

//crear constante que es igual a la libreria que importe
const app = express();

//Que acepte datos de json
app.use(express.json());

//Definir las rutas de las funciones que tendra la pagina web
app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewsRoutes);

//exporto la constante para poder usar express en otros archivos
export default app;
//ESCRIBIR UNA LINEA ADICIONAL EN EL package.json hasta arriba   [  "type": "module",  ] es la linea y tambien en scripts "dev": "nodemon index.js"
