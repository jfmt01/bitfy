/* 
    Vamos a crear el manejo de rutas de express para nuestra API.
    Se encargará de manejar las rutas del backend
*/

const express = require('express'),
    UsuarioControl = require('../control/usuarioControl'),
    multipart = require('connect-multiparty'),//Permite subir cualquier tipo de archivo
    subirImgDirectorio = multipart({uploadDir: './archivos/usuarios'}); //Ruta en la que se van a guardar los archivos
    


let api = express.Router(); //Carga el manejador de rutas de espress

//Declaración de las rutas que darán paso a la ejecución de las funciones
api.post('/registro', UsuarioControl.crearUsuario);
api.post('/login', UsuarioControl.login);
api.put('/actualizarUsuario/:id', UsuarioControl.actualizarUsuario);
api.put('/subirImgUsuario/:id', subirImgDirectorio, UsuarioControl.subirImg);
api.get('/imagenPerfil/:imageFile', subirImgDirectorio, UsuarioControl.mostrarImgPerfil);


/* 
--------MÉTODOS HTTP--------------

 POST -> agregar datos
 GET -> obtener datos
 PUT -> actualizar datos
 DELETE -> eliminar datos
*/

//Exportación del archivo usuarioRutas

module.exports = api;