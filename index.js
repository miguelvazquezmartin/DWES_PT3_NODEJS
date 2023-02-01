//PRÁCTICA TEMA 3 DWES

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

//indicamos el puerto
var puerto = 8083;
//indicamos la ip
var host = "127.0.0.3";

//Creamos el servidor HTTP
const server = http.createServer();



//Cuando se produzca la petición, se inicia la función que hay a continuación.
server.on('request', function(peticion,respuesta){
    
    //Obtnemos la extensión
    var urlBase = url.parse(peticion.url,true);
    var urlPrincipal = urlBase.pathname;
    var ext = path.extname(urlBase.pathname);
    var params = urlBase.query
    var folder;

    //Comprobamos si el pathname apunta a la raíz para devolver el index.html
    var baseUrl;
    if(urlPrincipal == '/'){
      
        //muestra en el directorio raíz por defecto un mensaje de bienvenida
        var salida = "";
        salida = "<h1>Bienvenido</h1>"
        respuesta.writeHead(200, { 'Content-Type': 'text/html; charset-utf-8' });
        respuesta.write(salida);
        respuesta.end();

    }else if(urlPrincipal == '/dni'){
        var numero = params.num;
        //muestra la página HTML ya existente.
        baseUrl = '/instrucciones.html';
        ext = '.html';
        //comprobamos si la query está definida
        if(params.num !== undefined){
            //calcula la letra que le corresponde al DNI por medio del resto de su división entre 23 siguiendo los parametros de una tabla específica
            var numero = params.num;
            //ejecuta la funcion pasandole el parámetro
            letra = dni(numero);
            //establecemos los parametros de la página HTML vacíos
            baseUrl = '';
            ext = '';
            //muestra por pantalla la operación realizada
            salida = "<h1>El DNI introducido es: </h1>"+ numero + "<h1> Al cual le corresponde la letra: </h1>" + letra;
            respuesta.writeHead(200, { 'Content-Type': 'text/html; charset-utf-8' });
            respuesta.write(salida);
            respuesta.end();
        }
    //Para crear la carpeta con el fichero.
    }else if(urlPrincipal == '/escribir'){
       //crea la carpeta copia  
       //Definimos el contenido que introduciremos en el archivo
        var contenido = "Miguel Vázquez Martín";
        fs.mkdir('./copia',  function(err){
            if(err){
                console.log('Error al crear la Caperta');
            }

            console.log('Carpeta creada');
        });
        //crea el fichero especificado y le añade el contenido
        fs.appendFile('./copia/holaMundo.txt', contenido,  function(err){
            if(err){
                console.log('Error al crear el fichero');
            }

            console.log('Fichero creado');
        });
    }else{
        //si se escribe una ruta que no es correcta se  escribe un aviso 
        var salida = "";
        salida = "<h1>No estas en la ruta correcta</h1>"
        respuesta.writeHead(200, { 'Content-Type': 'text/html; charset-utf-8' });
        respuesta.write(salida);
        respuesta.end();
    }
    
    
    //Según la extensión, escribiremos la cabeceraa e indicaremos la carpeta donde debe buscar el archivo
    switch(ext){
        case".html":
            respuesta.writeHead(200, {'Content-Type':'text/html; charset-utf-8'});
            folder = 'html';
            break
    }
    
    //Si el tipo de archivo es conocido, tendremos una carpeta definida
    if(folder !== undefined){
        //Abrimos el archivo indicado y lo escribimos en la respuesta
        fs.readFile(folder + baseUrl, function(err, codigo){
            if(err){
                throw err;
            }
            respuesta.write(codigo);
            respuesta.end();
        });
    }

});

//iniciamos el servidor
server.listen(puerto, host);
console.log('servidor web ejecutandose en http//:'+ host +':'+puerto);

//función para calcular la letra del dni introducido.
function dni(numero){
    calculo = (numero%23);
    resultado = calculo.toString();
    letra = "";
    switch(resultado){
        case "0":
            letra = "T";
            break;
        case "1":
            letra = "R";
            break;
        case "2":
            letra = "W";
            break;
        case "3":
            letra = "A";
            break;
        case "4":
            letra = "G";
            break;
        case "5":
            letra = "M";
            break;
        case "6":
            letra = "Y";
            break;
        case "7":
            letra = "F";
            break;
        case "8":
            letra = "P";
            break;
        case "9":
            letra = "D";
            break;
        case "10":
            letra = "X";
            break;
        case "11":
            letra = "B";
            break;
        case "12":
            letra = "N";
            break;
        case "13":
            letra = "J";
            break;
        case "14":
            letra = "Z";
            break;
        case "15":
            letra = "S";
            break;
        case "16":
            letra = "Q";
            break;
        case "17":
            letra = "V";
            break;
        case "18":
            letra = "H";
            break;
        case "19":
            letra = "L";
            break;
        case "20":
            letra = "C";
            break;
        case "21":
            letra = "K";
            break;
        case "22":
            letra = "E";
            break;
    }
    return letra;
}