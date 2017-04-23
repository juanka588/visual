var controls = new Controls();
var originalImg;
var img;
var details = 4;
var displayUnits = [];


function preload() {
    originalImg = loadImage("images/mario.jpg");
}

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    image(originalImg, 0, 0);
    loadPixels();
    var h = originalImg.height / details;
    var w = originalImg.width / details;
    var d = pixelDensity();
    var idx = 0;

    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            for (var i = 0; i < d; i++) {
                for (var j = 0; j < d; j++) {
                    idx = 4 * details * ((y * d + j) * width * d + (x * d + i));
                    var r = pixels[idx];
                    var g = pixels[idx + 1];
                    var b = pixels[idx + 2];
                    var a = pixels[idx + 3];
                    var clr = color(r, g, b, a);
                    displayUnits.push(new DisplayPixel(x * details, y * details, 0, details, clr));
                }
            }
        }
    }
}

function draw() {
    background(125);
    for (var i = 0; i < displayUnits.length; i++) {
        displayUnits[i].draw();
    }
}