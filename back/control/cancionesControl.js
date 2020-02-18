const Cancion = require('../modelo/cancion'),
    fs = require('fs'), //Importamos el Módulo File System de Node
    path = require('path');

const crearCancion = (req, res) => {

    let cancion = new Cancion();

    let propiedades = req.body;

    cancion.nombre = propiedades.nombre;
    cancion.artista = propiedades.artista;
    cancion.album = propiedades.album;
    cancion.duracion = propiedades.duracion;
    cancion.genero = propiedades.genero;
    cancion.portada = null;
    cancion.archivo = null;

    cancion.save((err, cancionNueva) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (!cancionNueva) {
                res.status(200).send({ message: 'No es posible realizar el registro. Datos no válidos' });
            } else {
                res.status(200).send({ cancion: cancionNueva });
            }
        }
    });
}

const buscarCancion = (req, res) => {
    let propiedades = req.body,
        busqueda = propiedades.nombre.toLowerCase();
    // busqueda.includes()

    Cancion.findOne({ nombre: busqueda }, (err, busquedaCancion) => {
        if (err) {
            res.status(500).send({ message: '¡Error en el servidor!' });
        } else if (!busquedaCancion) {
            res.status(200).send({ message: 'No se puede realizar la búsqueda' });
        } else if (busquedaCancion.nombre != busqueda) {
            res.status(200).send({ message: 'No hemos encontrado la canción que buscas' })
        } else {
            res.status(200).send({ cancion: busquedaCancion });
            console.log(busqueda)
        }
    })

}

const actualizarCancion = (req, res) => {
    let cancionId = req.params.id,
        nuevosDatosCancion = req.body;

    Cancion.findByIdAndUpdate(cancionId, nuevosDatosCancion, (err, cancionActualizada) => {
        if (err) {
            res.status(500).send({ message: '¡Error en el servidor!' })
        } else if (!cancionActualizada) {
            res.status(200).send({ message: 'No fue posible actualizar la canción' })
        } else {
            res.status(200).send({ cancion: cancionActualizada })
        }
    })
}

const subirCancion = (req, res) => {
    let cancionId = req.params.id;
    let nombreArchivo = "No ha subido ninguna canción...";

    //Validar si se está enviando la imagen o archivo

    if (req.files) {
        //Analizar la ruta, nombre y extensión del archivo
        let rutaArchivo = req.files.archivo.path;
        console.log(rutaArchivo);

        let partirArchivo = rutaArchivo.split('\\');
        console.log(partirArchivo);

        nombreArchivo = partirArchivo[2];
        console.log(nombreArchivo);

        let extCancion = nombreArchivo.split('\.');
        console.log(extCancion);

        let extensionArchivo = extCancion[1];
        console.log(extensionArchivo)

        //Validar si el formato del archivo es aceptable

        if (extensionArchivo == 'mp3' || extensionArchivo == "AAC" || extensionArchivo == 'wam') {
            //Actualizar el campo de la imagen del usuario, que está como null en el modelo
            Cancion.findByIdAndUpdate(cancionId, { archivo: nombreArchivo }, (err, archivoCancion) => {
                if (err) {
                    res.status(500).send({ message: '¡Error en el servidor!' });
                } else if (!archivoCancion) {
                    res.status(200).send({ message: 'No fue posible subir la canción' });
                } else {
                    res.status(200).send({ archivo: nombreArchivo, cancion: archivoCancion });
                }
            });
        } else {
            //Formato Inválido
            res.status(200).send({ message: '¡El formato de la canción es inválido!' });
        }
    } else {
        //No existe una imagen para subir
        res.status(200).send({ message: 'No se ha subido ninguna canción' })
    }
}

const mostrarCancion = (req, res) => {
    let cancion = req.params.song,
        ruta = './archivos/canciones/' + cancion;

    //Validar si existe la imagen
    //fs.exists('elarchivo a verificar', (existe o no) =>{})
    fs.exists(ruta, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(ruta));
        } else {
            res.status(200).send({ message: 'Canción no encontrada' });
        }
    });
}

const subirPortada = (req, res) => {
    let cancionId = req.params.id;
    let nombrePortada = "No ha subido ninguna imagen...";

    //Validar si se está enviando la imagen o archivo

    if (req.files) {
        //Analizar la ruta, nombre y extensión del archivo
        let rutaPortada = req.files.portada.path;
        console.log(rutaPortada);

        let dividirArchivo = rutaPortada.split('\\');
        console.log(dividirArchivo);

        nombrePortada = dividirArchivo[2];
        console.log(nombrePortada);

        let extPortada = nombrePortada.split('\.');
        console.log(extPortada);

        let extensionArchivo = extPortada[1];
        console.log(extensionArchivo)

        //Validar si el formato del archivo es aceptable

        if (extensionArchivo == 'jpg' || extensionArchivo == "jpeg" || extensionArchivo == 'png') {
            //Actualizar el campo de la imagen del usuario, que está como null en el modelo
            Cancion.findByIdAndUpdate(cancionId, { portada: nombrePortada }, (err, archivoPortada) => {
                if (err) {
                    res.status(500).send({ message: '¡Error en el servidor!' });
                } else if (!archivoPortada) {
                    res.status(200).send({ message: 'No fue posible subir la portada' });
                } else {
                    res.status(200).send({ portada: nombrePortada, cancion: archivoPortada });
                }
            });
        } else {
            //Formato Inválido
            res.status(200).send({ message: '¡El formato de la portada es inválido!' });
        }
    } else {
        //No existe una imagen para subir
        res.status(200).send({ message: 'No se ha subido ninguna portada' })
    }
}

const mostrarPortada = (req, res) => {
    let portada = req.params.portada,
        ruta = './archivos/portadas/' + portada;

    //Validar si existe la imagen
    //fs.exists('elarchivo a verificar', (existe o no) =>{})
    fs.exists(ruta, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(ruta));
        } else {
            res.status(200).send({ message: 'Portada no encontrada' });
        }
    });
}


module.exports = {
    crearCancion,
    buscarCancion,
    actualizarCancion,
    subirCancion,
    mostrarCancion,
    subirPortada,
    mostrarPortada
}