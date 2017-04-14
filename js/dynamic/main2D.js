var controls = new Controls();

var angle;
var length;
var step;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    angle = PI / 4;
    length = 40;
    step = 10;
    controls.setCustom("dynamic/customControls.html");
    background(255, 0, 255);
}

function draw() {
    if (docReady) {
        angle = (document.getElementById('angleInput').value / 180) * PI;
        step = (document.getElementById('stepInput').value);
    }
    background(0);
    push();
    controls.controle();
    push();
    translate(width / 2, height);
    fractal(60, -1);
    pop();
    push();
    translate(width / 2, 0);
    fractal(60, 1);
    pop();
    pop();
}

function fractal(size, dir) {
    if (size < 10) {
        return;
    }
    push();
    stroke(255);
    strokeWeight(2);
    line(0, 0, 0, dir * length);
    push();
    translate(0, dir * length);
    rotate(angle);
    line(0, 0, 0, dir * length);
    fractal(size - step, dir);
    pop();
    push();
    translate(0, dir * length);
    rotate(-angle);
    line(0, 0, 0, dir * length);
    fractal(size - step, dir);
    pop();
    pop();
}