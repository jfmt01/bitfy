/* Modelo es la representación en códigode de la estructura de la colecciones en nuestra base de datos */

const mongoose = require('mongoose'), //Importamos mongoose
    Schema = mongoose.Schema; //Creamos un objeto Schema para nuestra colección

//Crear instancia del objeto Schema

let UsuarioSchema = new Schema({
    nombre: String, 
    apellido: String,
    correo: String,
    contrasena: String,
    repeatContrasena: String,
    rol: Number,
    imagen: String 
    
});

//Exportar Schema

module.exports = mongoose.model('Usuario', UsuarioSchema) //mongoose.model('nombre de la colección', Schema de la colección)
