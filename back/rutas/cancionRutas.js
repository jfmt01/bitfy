const express = require('express'),
    CancionControl = require('../control/cancionesControl'),
    multipart = require('connect-multiparty'),
    subirCancionDirect = multipart({uploadDir: './archivos/canciones'}),
    subirPortadaDirect = multipart({uploadDir: './archivos/portadas'});

    let api = express.Router();

    api.post('/cargarContenido', CancionControl.crearCancion);
    api.post('/buscar', CancionControl.buscarCancion);
    api.put('/actualizarCancion/:id', CancionControl.actualizarCancion);
    api.put('/subirCancion/:id', subirCancionDirect, CancionControl.subirCancion);
    api.get('/cancion/:song', subirCancionDirect, CancionControl.mostrarCancion);
    api.put('/subirPortada/:id', subirPortadaDirect, CancionControl.subirPortada);
    api.get('/portada/:portada', subirCancionDirect, CancionControl.mostrarPortada);
    

    module.exports = api;