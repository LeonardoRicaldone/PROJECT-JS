# Instalar node.js para ejecutar la terminal [nodejs.org](https://nodejs.org/es)

Codigos de ejecucion en la terminal para el funcionamiento de el proyecto

## Parte backend --------------------
```
cd carpeta
```
```
npm init -y
```
```
npm install cors express
```
```
npm install mongoose
```
```
npm install dotenv
```
```
npm install nodemon -D
```
 poner el atajo para ejecutar nodemon en packaje.json en script como "dev": "nodemon index.js" luego para ejecutar use: npm run dev
```
node index.js
```

## Parte frontend-------------------
```
npm create vite@latest
```
-seleccionamos react y el "javaScript"  el amarillito
nos vamos a la carpeta del proyecto que se creo y hacemos
```
npm i
```
```
npm install react-router-dom
```
sirve para crear rutas hacia otras paginas
```
npm run dev
```
ejecuta la plantilla de el proyecto
en App.jsx puedes eliminar el contenido de la funcion y se eliminara la plantilla que viene default
quedaria algo asi:

```ruby
import './App.css'

function App() {

  return (
    <>
      
    </>
  )
}

export default App
```

vamos a boostrap y vamos a download buscamos CDN via jsDelivr 
copiamos y pegamos en el index.html arriba de title

```ruby
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
```
