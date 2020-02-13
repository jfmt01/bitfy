/* 
    Vamos a crear el manejo de rutas de express para nuestra API.
    Se encargará de manejar las rutas del backend
*/

const express = require('express'),
    UsuarioControl = require('../control/usuarioControl');

let api = express.Router(); //Carga el manejador de rutas de espress

//Declaración de las rutas que darán paso a la ejecución de las funciones
api.post('/registro', UsuarioControl.crearUsuario);

/* 
--------MÉTODOS HTTP--------------

 POST -> agregar datos
 GET -> obtener datos
 PUT -> actualizar datos
 DELETE -> eliminar datos
*/

//Exportación del archivo usuarioRutas

module.exports = api;