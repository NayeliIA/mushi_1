//***************************************************** Setup de eventos a escuchar
require('events').EventEmitter.defaultMaxListeners = 20
//***************************************************** HTTPS server setup
//-----* Express inicia servidor / carpeta raiz
//------------------------------------Express inicia servidor 
const express = require('express')
const app = express()
const fs = require('fs')
//const ImageDataURI = require('image-data-uri')
app.use(express.static(__dirname))//Carpeta de donde sirve / carpeta raiz public

const server = app.listen(8888, () => {
    console.log('Servidor web iniciado')
})

//-----* Filesystem module object
var fss = require('fs')
//-----* https module object
var https = require('https')

