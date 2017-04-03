/**
 * Created by Juan Camilo on 29/03/2017.
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
    length = 50;
    step = 10;
    background(255, 0, 255);
}

function draw() {
    angle = (document.getElementById('angleInput').value / 180) * PI;
    step = (document.getElementById('stepInput').value);
    background(0);
    push();
    controls.controle();
    fractal(length, 1);
    pop();
}

function fractal(size, dir) {
    if (size < 10) {
        return;
    }
    push();
    var shift = {x: 0, y: 0, z: size};
    strokeWeight(2);
    stroke(255);
    colorMode(HSB);
    specularMaterial(size + length % 255, 255, 255);
    rotateX(frameCount * 0.01);
    sphere(dir * size);
    push();
    translate(dir * size + shift.x, 0 + shift.y, dir * size + shift.z);
    rotateZ(angle);
    rotateX(frameCount * 0.01);
    sphere(dir * size);
    fractal(size - step, dir);
    pop();
    push();
    translate(dir * size + shift.x, 0 + shift.y, dir * size + shift.z);
    rotateZ(-angle);
    rotateX(frameCount * 0.01);
    sphere(dir * size);
    fractal(size - step, dir);
    pop();
    pop();
}