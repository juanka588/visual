var controls = new Controls();
var originalImg;
var img;
var details = 2;
var displayUnits = [];
var canvasWidth = 600;


new p5(function (p) {
    p.preload = function () {
        originalImg = p.loadImage("images/mario.jpg");
    };

    p.setup = function () {
        p.createCanvas(600, 500);
        p.loadImageSource();
    };
    p.draw = function () {
        p.background(255);
//        p.push();
//        for (var i = 0; i < displayUnits.length; i++) {
//            displayUnits[i].draw(p);
//        }
//        p.pop();
    };

    p.loadImageSource = function () {
        p.image(originalImg, 0, 0);
        p.loadPixels();
        var h = originalImg.height / details;
        var w = originalImg.width / details;
        var d = p.pixelDensity();
        var idx = 0;

        for (var x = 0; x < w; x++) {
            for (var y = 0; y < h; y++) {
                for (var i = 0; i < d; i++) {
                    for (var j = 0; j < d; j++) {
                        idx = 4 * details * ((y * d + j) * canvasWidth * d + (x * d + i));
                        var r = p.pixels[idx];
                        var g = p.pixels[idx + 1];
                        var b = p.pixels[idx + 2];
                        var a = p.pixels[idx + 3];
                        var clr = p.color(r, g, b, a);
                        displayUnits.push(new DisplayPixel(x * details, y * details, hue(clr), details, clr));
                    }
                }
            }
        }
        pixels = null;
        originalImg = null;

    };


});


function setup() {
    var canvas = createCanvas(canvasWidth, 600, WEBGL);
    canvas.parent('sketch-holder');
}

function draw() {
    background(125);
    push();
    translate(-width / 2, -height / 4, 0);
    controls.controle();
    for (var i = 0; i < displayUnits.length; i++) {
        displayUnits[i].draw();
    }
    pop();
}
