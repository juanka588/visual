/**
 * Created by usuario13 on 29/03/2017.
 */

var angle;
var length;
var step;
var controls;

function setup() {
    var canvas = createCanvas(600, 600, WEBGL);
    canvas.parent('sketch-holder');
    angle = PI / 4;
    controls = new Controls();
    length = 40;
    step = 10;
    background(255, 0, 255);
}

function draw() {
    angle = (document.getElementById('angleInput').value / 180) * PI;
    step = (document.getElementById('stepInput').value);
    background(120);
    push();
    controls.controle();
    fractal(60, 1);
    pop();
}

function fractal(size, dir) {
    if (size < 10) {
        return;
    }
    push();
    stroke(255);
    strokeWeight(2);
//    rotateX(frameCount * 0.01);
    box(dir * length);
    push();
    translate(dir * length, 0, dir * length);
    rotateZ(angle);
//    rotateX(frameCount * 0.01);
    box(dir * length);
    fractal(size - step, dir);
    pop();
    push();
    translate(dir * length, 0, dir * length);
    rotateZ(-angle);
//    rotateX(frameCount * 0.01);
    box(dir * length);
    fractal(size - step, dir);
    pop();
    pop();
}