/*
    Este archivo contiene la conexión o consumo de nuestra api y cada ruta.
    A su vez traerá los datos que exitan nuestra BD.
*/

// <---------Importar librerías o módulos internos de Angular----------->

//Injectable -> Nos va a permitir inyectar el servicio en toda la app de Angular o en un componente

import { Injectable } from "@angular/core";

//HttpClient -> Viene del módulo HttpHeaders. Permite enviar las peticiones a la API
import { HttpClient, HttpHeaders } from "@angular/common/http";

//Map -> Permite mapear un objeto. Analiza un JSON y nos permite traer cada propiedad que esta contenga
import { map } from "rxjs/operators";

//Dentro de Angular existe un elemento llamada observable, que recoge las respuestas que se envian a un servidor
import { observable } from "rxjs";

@Injectable()
export class UsuarioService {
    //Crea cada servicio que va a interactuar entre el front y el back

    //Crear una variable que guarde la ruta o URL de la API con la que nos queremos conectar
    url = "http://localhost:4000/api/"

    //Crearemos una variable pública que nos permita reconocer al usuario para un Local Storage
    public identidad;

    /* 
        Vamos a crear un constructor que nos permita inicializar los métodos con los que vamos a trabajar (GET, POST, PUT, DELETE).
        Crearemos una variable privada que guardará el onjeto HttpClient, esto para poder tener acceso a los métodos
    */

    constructor(
        private _http: HttpClient
    ) { }

    //Crear el método de registro de usuario (servicio a consumir por un componente o todo el aplicativo) de registro de Usuario
    registro(usuarioNuevo){
        //Guardar los parámetros que va a enviar el usuario y los convertiremos en un JSON

        let params = JSON.stringify(usuarioNuevo);

        //Indicar por las cabeceras HTTP el tipo de contenido del dato que se está enviando
        let options = {
            headers: new HttpHeaders({'Content-Type':'application/json'})
        };

        //Este método debe retornar la conexión con la ruta de la api para ejecutar una función en específico
        //localhost:4000/api/registro
        return this._http.post(
            this.url + "registro",
            params,
            options
        ).pipe(map(res => res));
 
    } 
}


