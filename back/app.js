/* Va a contener toda la lógica de  ruteo de express.
Declaración de rutas, uso del middleware body-parser.
Permisos de acceso a cualquier cliente (permisos al aplicativo Front hecho en Angular) */

const express = require("express"),
  bodyParser = require("body-parser"), //Permite analizar datos de la URL
  app = express();

//Solicitar la rutas de acceso de cada función que ejecutará nuestra aplicación

const userRoutes = require("./rutas/usuarioRutas");
//----MIDDLEWARES----

//Declaramos el análisis de datos con body-parser

app.use(bodyParser.json());

//Configuración de permisos de acceso

//Consumo de las rutas
app.use("/api", userRoutes);

//Exportar el archivo

module.exports = app;
