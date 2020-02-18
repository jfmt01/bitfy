const mongoose = require('mongoose');

Schema = mongoose.Schema;

let AdminSchema = new Schema({
    nombre: String,
    apellido: String,
    correo: String,
    contrasena: String,
    repeatContrasena: String,
    rol: Number,
    imagen: String

});

module.exports = mongoose.model('Admin', AdminSchema);