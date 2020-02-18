const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let CancionSchema = new Schema ({
    nombre : String,
    artista : String,
    album : String,
    duracion : String,
    genero : String,
    portada : String,
    archivo : String
});

module.exports = mongoose.model('Cancione', CancionSchema);