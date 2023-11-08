let point = 0

let fullimage = document.getElementById('CanvasFHD') //canvas donde se pondra la imagen original 
let fullimagectx = fullimage.getContext('2d')

let capturedCanvas = document.getElementById('capturedCanvas') //canvas donde se pondra la imagen original 
let capturedCanvasctx = capturedCanvas.getContext('2d')
let capturedCanvas2 = document.getElementById('capturedCanvas2') //canvas donde se pondra la imagen original 
let capturedCanvas2ctx = capturedCanvas2.getContext('2d')

function mostrar(){
document.getElementById('CanvasFHD').style.visibility="visible"

}

//**********************configuración del canvas FHD***************************/

/*document.getElementById('CanvasFHD').style.visibility="hidden"*/

/***************************funciones*****************************************/

function restartpage() {
    location.reload()
}

function captura_datos() {
    serial = document.getElementById('myInput')
    if (serial.value.lenght > 1) { //si el input ya tiene informacion, que se limpie
        serial.value = ''

    } else {
        serial.focus() //si no, que siga el focus hasta que haya informacion
    }

}
function mapcams() { // ver los id's de las camaras
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const filtered = devices.filter(device => device.kind === 'videoinput');
            console.log('Cameras found', filtered);
        });
}

function open_cam(point) {// Resolve de 2 segundos

    return new Promise(async resolve => {
        let camid
        if (point == 1) { camid = "069cf941808f2604335064e95bcbb7327f17397d05cb942a5ca177fd755ce08e" } // ID de cada camara 
        if (point == 2) { camid = "e2e9dc3f389c3a71bdd845eaaceaecfe6b14617ab70536e0b8c0bbb19b4a5baf" } // ID de cada camara 
        // Falta declarar 2 camaras 

        const video = document.querySelector('video')
        const vgaConstraints = {
            video: {
                deviceId: camid,
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            } //width: {exact: 280}, height: {exact: 280} / deviceId: "5bba2c7c9238e1d8ab5e90e2f2f94aa226749826319f6c705c5bfb5a3d2d5279"
        }
        await navigator.mediaDevices.getUserMedia(vgaConstraints).then((stream) => { video.srcObject = stream }).catch(function (err) { console.log(err.name) })
        setTimeout(function fire() { resolve('resolved'); }, 2000) //tiempo para el opencam
        //setTimeout(function fire(){resolve('resolved');},1000);
    });//Cierra Promise principal
}

function captureimage() {

    return new Promise(async resolve => {

        const video = document.getElementById("video")
        
        fullimagectx.drawImage(video,0,0,fullimage.width,fullimage.height) // Dibuja en el full
        
        capturedCanvasctx.drawImage(fullimage,0,0,capturedCanvas.width,capturedCanvas.height)

        setTimeout(function fire() { resolve('resolved'); }, 5000);//Temporal para programacion de secuencia
        console.log("FHD Image captured")
        resolve('resolved')
    })

}

function captureimage2() {

    return new Promise(async resolve => {

        const video = document.getElementById("video")
        
        fullimagectx.drawImage(video,0,0,fullimage.width,fullimage.height) // Dibuja en el full
        
        capturedCanvas2ctx.drawImage(fullimage,0,0,capturedCanvas2.width,capturedCanvas2.height)
        console.log("estoy en el canvas2")
        setTimeout(function fire() { resolve('resolved'); }, 4000);//Temporal para programacion de secuencia
        console.log("FHD Image captured")
        resolve('resolved')
    })

}
/*function captureimage() {

    return new Promise(async resolve => {

        let capturedCanvas = document.getElementById('capturedCanvas')
        let capturedCanvas2 = document.getElementById('capturedCanvas2')
        //let fullimagectx = capturedCanvas.getContext( '2d' );
        let video = document.getElementById("video");
        //captura la imagen de la camara 1
        w = capturedCanvas.width;
        h = capturedCanvas.height;
        w1 = capturedCanvas.width;
        h1 = capturedCanvas.height;
        capturedCanvas.getContext('2d').drawImage(video, 0, 0, w, h);
        capturedCanvas2.getContext('2d').drawImage(video, 0, 0, w1, h1);
        setTimeout(function fire() { resolve('resolved'); }, 5000);//Temporal para programacion de secuencia
        console.log("FHD Image captured")
        resolve('resolved')
    })

}*/

function stopcam() {
    return new Promise(async resolve => {
        const video = document.querySelector('video');
        // A video's MediaStream object is available through its srcObject attribute
        const mediaStream = video.srcObject;
        // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
        const tracks = mediaStream.getTracks();
        tracks.forEach(track => { track.stop() })//;console.log(track);
        setTimeout(function fire() { resolve('resolved'); }, 1000);
    });//Cierra Promise principal
}
async function sequence() {
    for (point = 1; point < 3; point++) {
        await open_cam(point)
        if(point === 1){
            await captureimage()
            await stopcam()
        }else if(point === 2){
            await captureimage2()
            await stopcam()
        }
        //await stopcam()
        
 
    }
    console.log("secuencia completa")
}