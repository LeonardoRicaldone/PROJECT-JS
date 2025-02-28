 


 //importamos lo que exportamos en el app que creamos en app.js
 import app from "./app.js";
 //importamos la base de datos 
 import "./database.js"

 //creo una funcion
 //se conecta al servidor en el puerto seleccionado
 async function main(){

    const port = 4000;
    app.listen(port); 
    console.log("server on port" + port);

 }

 //ejecuta la funcion
 main();
