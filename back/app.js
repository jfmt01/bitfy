/* Va a contener toda la lógica de  ruteo de express.
Declaración de rutas, uso del middleware body-parser.
Permisos de acceso a cualquier cliente (permisos al aplicativo Front hecho en Angular) */

const express = require("express"),
  bodyParser = require("body-parser"), //Permite analizar datos de la URL
  app = express();

//Solicitar la rutas de acceso de cada función que ejecutará nuestra aplicación

const userRoutes = require("./rutas/usuarioRutas");
const songRoutes = require("./rutas/cancionRutas")
//----MIDDLEWARES----

//Declaramos el análisis de datos con body-parser

app.use(bodyParser.json());

//Configuración de permisos de acceso
//CORS

app.use((req, res, next) => {
  //Todos estos permisos se envian por las cabeceras HTTP
  //Estos permisos se derivan de AJAX(Asynchronous JavaScript XHML)

  //Todos los dominios (origenes)
  res.header('Access-Control-Allow-Origin', '*')

  //Todos los metadatos
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Methods');

  //Todos los métodos HTTP (request methods)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  //Confirmación de los métodos a utilizar
  res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');

  next()

})

//Consumo de las rutas
app.use("/api", userRoutes);
app.use("/api", songRoutes);

//Exportar el archivo

module.exports = app;
