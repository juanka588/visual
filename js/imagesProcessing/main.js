var controls = new Controls();
var originalImg;
var img;
var details = 10;
var show2D = false;
var isFlat = false;
var displayUnits = [];
var canvasWidth = 600;
var ref;

new p5(function (p) {
    p.preload = function () {
        originalImg = p.loadImage("images/X.png");
    };

    p.setup = function () {
        p.createCanvas(600, 500);
        p.loadImageSource();
    };
    p.draw = function () {
        ref = p;
        p.background(255);
        if (docReady) {
            show2D = document.getElementById("show2DInput").checked;
        }
        if (show2D) {
            p.push();
            for (var i = 0; i < displayUnits.length; i++) {
                displayUnits[i].draw(p);
            }
            p.pop();
        }
    };

    p.loadImageSource = function () {
        loadImageSource(p);
    };


});

function loadImageSource(p) {
    displayUnits = [];
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
                    displayUnits.push(new DisplayPixel(x * details, y * details
                            , hue(clr)
                            , details, clr));
                }
            }
        }
    }
    pixels = null;
    originalImg = null;
}


function setup() {
    var canvas = createCanvas(canvasWidth, 600, WEBGL);
    canvas.parent('sketch-holder');
    controls.setCustom("imageProcessing/customControls.html");
}

function draw() {
    background(125);
    if (docReady && ref !== undefined) {
        isFlat = document.getElementById("isFlatInput").checked;
        details = document.getElementById("detailsInput").value;
    }
    push();
    translate(-width / 4, -height / 4, 0);
    controls.controle();
    for (var i = 0; i < displayUnits.length; i++) {
        displayUnits[i].draw();
    }
    pop();
}
