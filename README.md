instalar node.js para ejecutar la terminal https://nodejs.org/es

parte backend--------------------
cd carpeta
npm init -y
npm install cors express
npm install mongoose
npm install dotenv
npm install nodemon -D    poner el atajo para ejecutar nodemon en packaje.json luego ejecutar npm run dev
node index.js

parte frontend-------------------
npm create vite@latest
-seleccionamos react y el "javaScript"  el amarillito
nos vamos a la carpeta del proyecto que se creo y hacemos
npm i 
npm run dev    ejecuta la plantilla de el proyecto
en App.jsx puedes eliminar el contenido de la funcion y se eliminara la plantilla que viene default
quedaria algo asi:

import './App.css'

function App() {

  return (
    <>
      
    </>
  )
}

export default App

vamos a boostrap y vamos a download buscamos CDN via jsDelivr 
copiamos y pegamos en el index.html arriba de title
