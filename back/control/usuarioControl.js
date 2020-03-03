/*
    Se encaragará de recibir los datos que el usuario envía desde la vista, procensandolos
    para enviarlos al modelo y que este los pueda corroborar con BD para posteriormenñte guardarlos.
    También tendrá toda la lógica de las consultas, actualizaciones y eliminaciones.
*/
const Usuario = require('../modelo/usuario'), //Importamos el modelo de usuario
    fs = require('fs'), //Importamos el Módulo File System de Node
    path = require('path'); //Importamos el módulo Path de Node

const crearUsuario = (req, res) => {
    //Instanciar el objeto Usuario

    let usuario = new Usuario();

    //Guarda el cuerpo de la petición para mejorar acceso a los datos que el usuario está enviando

    let propiedades = req.body;

    //Guardamos las propiedades del json de la petición en la propiedad correspondiente del modelo
    usuario.nombre = propiedades.nombre;
    usuario.apellido = propiedades.apellido;
    usuario.correo = propiedades.correo;
    usuario.contrasena = propiedades.contrasena;
    usuario.rol = 2;
    usuario.imagen = null;

    //Guardar y validar los datos
    usuario.save((err, usuarioNuevo) => {
        if (err) {
            //El primer error a validar será a nivel de servidor e infraestructura, para esto existen states.
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (!usuarioNuevo) {
                //404 -> Página no encontrada
                //200 -> OK, una alerta indicando que hay datosa inválidos
                res.status(200).send({ message: 'No es posible realizar el registro. Datos no válidos' });
            } else {
                //200
                res.status(200).send({ usuario: usuarioNuevo });
            }
        }
    });
}

const login = (req, res) => {
    let propiedades = req.body,
        correoUsuario = propiedades.correo,
        passUsuario = propiedades.contrasena;

    Usuario.findOne({ correo: correoUsuario.toLowerCase() }, (err, usuarioLogeado) => {
        if (err) {
            res.status(500).send({ message: '¡Error en el servidor!' });
        } else if (!usuarioLogeado) {
            res.status(200).send({ message: 'No has podido iniciar sesión. Verifica los datos' });
        } else if (usuarioLogeado.contrasena != passUsuario) {
            res.status(200).send({ message: 'Contraseña incorrecta' });
        } else {
            res.status(200).send({ usuario: usuarioLogeado });
        }
    });
}

const actualizarUsuario = (req, res) => {
    let userId = req.params.id,
        nuevosDatosUsuario = req.body;

    Usuario.findByIdAndUpdate(userId, nuevosDatosUsuario, (err, usuarioActualizado) => {
        if (err) {
            res.status(500).send({ message: '¡Error en el servidor!' });
        } else if (!usuarioActualizado) {
            res.status(200).send({ message: 'No fue posible actualizar lo datos' });
        } else {
            res.status(200).send({ usuario: usuarioActualizado });
        }
    })
}

const subirImg = (req, res) => {
    let usuarioId = req.params.id;
    let nombreArchivo = "No ha subido ninguna imagen...";

    //Validar si se está enviando la imagen o archivo

    if (req.files) {
        //Analizar la ruta, nombre y extensión del archivo
        let rutaArchivo = req.files.imagen.path;
        console.log(rutaArchivo);

        let partirArchivo = rutaArchivo.split('\\');
        console.log(partirArchivo);

        nombreArchivo = partirArchivo[2];
        console.log(nombreArchivo);

        let extensionImg = nombreArchivo.split('\.');   
        console.log(extensionImg);

        let extensionArchivo = extensionImg[1];
        console.log(extensionArchivo)

        //Validar si el formato del archivo es aceptable

        if (extensionArchivo == 'png' || extensionArchivo == "jpg" || extensionArchivo == 'jpeg') {
            //Actualizar el campo de la imagen del usuario, que está como null en el modelo
            Usuario.findByIdAndUpdate(usuarioId, { imagen: nombreArchivo }, (err, userImg) => {
                if (err) {
                    res.status(500).send({ message: '¡Error en el servidor!' });
                } else if (!userImg) {
                    res.status(200).send({ message: 'No fue posible actualizar la imagen' });
                } else {
                    res.status(200).send({ imagen: nombreArchivo, usuario: userImg });
                }
            });
        } else {
            //Formato Inválido
            res.status(200).send({ message: '¡El formato de la imagen es inválido!' });
        }
    } else {
        //No existe una imagen para subir
        res.status(200).send({ message: 'No se ha subido ninguna imagen' })
    }
}

const mostrarImgPerfil = (req, res) => {
    let archivo = req.params.imageFile,
        ruta = './archivos/usuarios/' + archivo;

    //Validar si existe la imagen
    //fs.exists('elarchivo a verificar', (existe o no) =>{})
    fs.exists(ruta, (exists) =>{
        if (exists) {
            res.sendFile(path.resolve(ruta));
        }else{
            res.status(200).send({message: 'Imagen no encontrada'});
        }
    });
}

module.exports = {
    crearUsuario,
    login,
    actualizarUsuario,
    subirImg,
    mostrarImgPerfil
}