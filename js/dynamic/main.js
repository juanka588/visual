/**
 * Created by usuario13 on 29/03/2017.
 */

var angle;
var length;
var step;
var axeAngleX;
var axeAngleY;
var axeAngleZ;

function setup() {
    var canvas = createCanvas(600, 600, WEBGL);
    canvas.parent('sketch-holder');
    angle = PI / 4;
    length = 40;
    step = 10;
    background(255, 0, 255);
}

function draw() {
    angle = (document.getElementById('angleInput').value / 180) * PI;
    step = (document.getElementById('stepInput').value);
    axeAngleX = (document.getElementById('axeAngleX').value / 180) * PI;
    axeAngleY = (document.getElementById('axeAngleY').value / 180) * PI;
    axeAngleZ = (document.getElementById('axeAngleZ').value / 180) * PI;
    background(0);
    push();
    rotateY(axeAngleY);
    // rotateX(axeAngleX);
    pointLight(255, 255, 255, 0, 0, 0);
    specularMaterial(250, 0, 0);
    pop();
    push();
    // translate(width / 2, height);
    rotateY(axeAngleY);
    rotateX(axeAngleX);
    rotateZ(axeAngleZ);
    fractal(60, 1);
    pop();
    // push();
    // translate(width / 2, 0);
    // fractal(60, 1);
    // pop();
}

function fractal(size, dir) {
    if (size < 10) {
        return;
    }
    push();
    stroke(255);
    strokeWeight(2);
    rotateX(frameCount*0.01);
    box(dir * length);
    push();
    translate(dir * length,0,dir * length);
    rotateZ(angle);
    rotateX(frameCount*0.01);
    box(dir * length);
    fractal(size - step, dir);
    pop();
    push();
    translate(dir * length,0, dir * length);
    rotateZ(-angle);
    rotateX(frameCount*0.01);
    box(dir * length);
    fractal(size - step, dir);
    pop();
    pop();
}