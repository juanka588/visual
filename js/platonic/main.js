/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var controls = new Controls();

var mode;
var boundingSphere = false;
var canRotate = true;
var mouse = false;
var solids = [];
var totalObjs = 1;
var radius = 200;
var pg;


function setup() {
    var canvas = createCanvas(600, 600, WEBGL);
    canvas.parent('sketch-holder');
    pg = createGraphics(256, 256);
    init(DODECAHEDRON);
}

function init(type) {
    solids = [];
    for (var i = 0; i < totalObjs; i++) {
        solids.push(new PlatonicSolid(i * radius, i * radius, 1, radius, type, pg));
    }
}

function draw() {
    background(255);
    push();
    if (controls !== undefined) {
        controls.controle();
    }
    for (var i = 0; i < solids.length; i++) {
        var solid = solids[i];
        if (solid !== null) {
            solid.draw();
            if (boundingSphere) {
                push();
                specularMaterial(200, 0, 0);
                sphere(solid.radius);
                pop();
            }
        }
    }
    pop();
}


function keyPressed() {
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
