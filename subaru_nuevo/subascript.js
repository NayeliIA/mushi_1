
let canvasCamara = document.getElementById('canvasCamara')
let contextcanvasCamara = canvasCamara.getContext('2d')


function restartpage(){
    location.reload()
}

const input = document.querySelector('#myInput');

input.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    input.value = '';
    input.focus();
  }
});
function mapcams() {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const filtered = devices.filter(device => device.kind === 'videoinput');
            console.log('Cameras found', filtered);
        });
}
/*function sequence(){
   open_cam(point)
    
}*/