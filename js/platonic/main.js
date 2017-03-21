/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mode;
var boundingSphere = false;
var canRotate = true;
var mouse = false;
var solids = [];
var totalObjs = 1;
var radius = 200;


function setup() {
    createCanvas(600, 600, WEBGL);
    init(DODECAHEDRON);
}
function init(type) {
    solids = [];
    for (var i = 0; i < totalObjs; i++) {
        solids.push(new PlatonicSolid(i * radius, i * radius, 1, radius, type));
    }
}

function draw() {
    background(0);
    if (mouse && !canRotate) {
        camera(mouseX, mouseY, (mouseY + mouseX) / tan(PI / 6.0));
    }
    if (mouse) {
        // draw the solid at the canvas center
        translate(width / 2, height / 2, 0);
    }
    //scale(0.5, 0.5);
    if (canRotate && !mouse) {
        rotateX(frameCount * radians(90) / 50);
        rotateY(-140 * radians(90) / 50);
    }
    for (var i = 0; i < solids.length; i++) {
        var solid = solids[i];
        if (solid !== null) {
            solid.draw();
            if (boundingSphere) {
                push();
                var dirY = (mouseY / height - 0.5) * 4;
                var dirX = (mouseX / width - 0.5) * 4;
                fill(200);
                directionalLight(0, 255, 255, dirX, dirY, dirX + dirY);
                sphere(solid.radius);
                pop();
            }
        }
    }
}

function keyPressed() {
//    if (key === ' ') {
//        mode = mode < 2 ? mode + 1 : 0;
//    }
    if (key === 'T') {
        init(TETRAHEDRON);
    }
    if (key === 'C') {
        init(CUBE);
    }
    if (key === 'O') {
        init(OCTAHEDRON);
    }
    if (key === 'D') {
        init(DODECAHEDRON);
    }
    if (key === 'I') {
        init(ICOSAHEDRON);
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