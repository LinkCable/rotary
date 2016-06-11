// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator and gain node
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

// connect oscillator to gain node to speakers

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

// create initial theremin frequency and volumn values

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var maxFreq = 6000;
var maxVol = 0.02;

var initialFreq = 3000;
var initialVol = 0.001;

// set options for the oscillator

oscillator.type = 'square';
oscillator.frequency.value = initialFreq; // value in hertz
oscillator.detune.value = 100; // value in cents
oscillator.start(0);

oscillator.onended = function() {
  console.log('Your tone has now stopped playing!');
}

gainNode.gain.value = initialVol;

// Mouse pointer coordinates
var curX;
var curY;
var curZ;

// Get new mouse pointer coordinates when mouse is moved
// then set new gain and pitch values

document.onmousemove = updatePage;

function updatePage(event) {
    curX = event.beta;
    curY = event.gamma;
    curZ = event.alpha;

    console.log(event);
    oscillator.frequency.value = ((curX + 180) / 360) * maxFreq;
    gainNode.gain.value = ((curY + 90) / 180) * maxVol;

    console.log(gainNode.gain.value);
    canvasDraw();
}


//canvas visualization
function random(number1,number2) {
  var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
  return randomNo;
}

var canvas = document.querySelector('.canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;

var canvasCtx = canvas.getContext('2d');

function canvasDraw() {
    var red = Math.floor((curX + 180) % 255);
    var green = Math.floor((curZ + 180) % 255);
    var blue = Math.floor((curY + 90) % 255);
    var rgb = "rgb("+red+","+green+","+blue+")";
    canvasCtx.fillStyle = rgb;
    canvasCtx.fillRect(0,0, WIDTH, HEIGHT);
    console.log(rgb);
}


window.addEventListener('deviceorientation', updatePage);
