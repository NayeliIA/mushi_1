//**************************************************** Setup de eventos a escuchar
require('events').EventEmitter.defaultMaxListeners = 20;
//**************************************************** HTTPS server setup
//-----* Express inicia servidor / carpeta raiz
const express = require('express');
const app = express();

app.use(express.static(__dirname));

var https = require('https');
var fss = require('fs');

var key = fss.readFileSync('C:/Users/nayeli_garcia/Desktop/subaru_nuevo/encryption/server.key');
var cert = fss.readFileSync('C:/Users/nayeli_garcia/Desktop/subaru_nuevo/encryption/server.cert');
var httpsOptions = { key: key, cert: cert };

const server = https.createServer(httpsOptions, app).listen(5000, function (connection) {
    console.log('Server ready...');

});

server.on('data', function(data) { console.log(data.toString())});

//************************************************************** Coneccion de socketio a servidor en servicio
//Socket configuration 
var io = require('socket.io')(server); //Bind socket.io to our express server.

// Home manda llamar a esta conexion
io.on('connection', (socket) => {		
    socket.on('deletefile', function (path) {
        deletef(path);
    }); //Close socket

    socket.on('picsaving', async function (uri,sn) {
        await savingpic(uri, sn);
        console.log("recibe", serialnumber);
        console.log("este es el inputvalue "+sn)
    });
    socket.on('renombrasnr', function (inputValue) { // conexion con main_script
        renombraF(inputValue);
    });    
});

//-----* Guarda imagen desde URI
async function savingpic(datauri,sn) {

    let filePath;
    const ImageDataURI = require('image-data-uri');
    return new Promise(async resolve => {
        //console.log("Variables:"+serial+' - '+sqty+'');// temporal para ver que esta rebiendo 
        //C:/Users/mayra_ayala/Documents/Aquiles/img/
        //C:/Users/gdl3_mds/myapp/timsamples/
        let filePath = 'C:/Users/nayeli_garcia/Desktop/subaru_nuevo/pruebas/' + sn + '';//Ruta de las carpetas por serial
        let filevalidation = fss.existsSync(filePath);

        if (filevalidation) {

            filePath = '' + filePath + '/' +"1"+ '';
            console.log(sn)
            ImageDataURI.outputFile(datauri, filePath).then(res => console.log(res));
        }
        else {
            fss.mkdir(filePath, (error) => {
                if (error) {
                    console.log(error.message);//en caso de que el folder ya exista manda un error y evita hacer otro folder con el mismo nombre.
                }
                filePath = '' + filePath + '/' +"1"+'' ;
                ImageDataURI.outputFile(datauri, filePath).then(res => console.log(res));
                console.log("Directorio creado");
            });
        }
    });//Cierra Promise
}
//Funcion para renombrar carpeta F 
async function renombraF(inputValue) {
    
    fs.rename('C:/Users/nayeli_garcia/Desktop/subaru_nuevo/pruebas/' + inputValue,
        'C:/Users/nayeli_garcia/Desktop/subaru_nuevo/pruebas/' + inputValue + '_F',
        function (err) {
            if (err)
                console.log('Error de renombramiento');
        });
}
var net = require('net')
var tcpipserver = net.createServer(function(connection) { 
   console.log('TCP client connected');
   //connection.on('end', function() {
      //console.log(Buffer.toString());  
   //});
   //connection.write('Handshake ok!\r\n');
   //connection.pipe(connection);

   //Funcion para imprimir la cadena que le envianconsole.log(data)
   connection.on('data', function(data) { console.log(data.toString())});
  // connection.on('data', function(data) {console.log(data)})
//{io.emit('Timsequence_start',data.toString());console.log("Analisis in process...");}
  //console.log('Received bytes: ' + data);
  
  //Inicia la secuencia
   
  /*/Responde a PLC cuando termine inspeccion
  setTimeout(function respuesta(){
	  estadoconexion = connection.readyState
	  console.log("Comunicacion con el plc :"+connection.readyState)
	  
		 if (estadoconexion == 'closed' ){
			 console.log("Puerto de PLC cerrado reintento en 1min..."  )
		 }

         
		 if (estadoconexion == 'open'){
				connection.write(plc_endresponse)
		 }

	},60000)
    */
	})
tcpipserver.listen(7777, function () {
    console.log(' Server Port 80 listening...');
});
/*
function plcdatasender(result_matrix) {
    matrixtostring=result_matrix.toString()
    plc_endresponse=matrixtostring
}
*/
