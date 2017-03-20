/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mode;
var boundingSphere = true;
var canRotate = false;
var mouse = false;
var solid;
var radius = 200;


function setup() {
    createCanvas(600, 600, WEBGL);
    solid = null;
}

function draw() {
    background(0);
    var dirY = (mouseY / height - 0.5) * 4;
    var dirX = (mouseX / width - 0.5) * 4;
    directionalLight(204, 204, 204, dirX, dirY, 1);
    if (mouse && !canRotate) {
        camera(mouseX, mouseY, (height / 2) / tan(PI / 6), width / 2, height / 2, 0, 0, 1, 0);
    }
    // draw the solid at the canvas center
    //translate(width / 2, height / 2, 0);
    //scale(0.5, 0.5);
    if (canRotate && !mouse) {
        rotateX(frameCount * radians(90) / 50);
        rotateY(frameCount * radians(90) / 50);
    }
    if (solid != null) {
        solid.draw();
        if (boundingSphere) {
            push();
            noStroke();
            fill(0, 255, 255, 125);
            sphere(solid.radius);
            pop();
        }
    }
//    noLoop();
}

function keyPressed() {
//    if (key === ' ') {
//        mode = mode < 2 ? mode + 1 : 0;
//    }
    if (key === 'T') {
        solid = new PlatonicSolid(radius, TETRAHEDRON);
    }
    if (key === 'C') {
        solid = new PlatonicSolid(radius, CUBE);
    }
    if (key === 'O') {
        solid = new PlatonicSolid(radius, OCTAHEDRON);
    }
    if (key === 'D') {
        solid = new PlatonicSolid(radius, DODECAHEDRON);
    }
    if (key === 'I') {
        solid = new PlatonicSolid(radius, ICOSAHEDRON);
    }
    if (key === 'B') {
        boundingSphere = !boundingSphere;
    }
    if (key === 'R') {
        canRotate = !canRotate;
    }
    if (key === 'M') {
        mouse = !mouse;
    }
}