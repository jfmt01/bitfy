const Cancion = require('../modelo/cancion');

const crearCancion =  (req, res) => {
    
    let cancion = new Cancion();

    let propiedades = req.body;

    cancion.nombre = propiedades.nombre;
    cancion.artista = propiedades.artista;
    cancion.album = propiedades.album;
    cancion.duracion = propiedades.duracion;
    cancion.genero = propiedades.genero;
    cancion.portada = null;
    cancion.archivo = null;

    usuario.save((err, cancionNueva)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!cancionNueva){
                res.status(200).send({message : 'No es posible realizar el registro. Datos no válidos'});
            }else{
                res.status(200).send({cancion: cancionNueva});
            }
        }
    });
}

module.exports = {
    crearCancion
}