/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var controls = new Controls();

var sketch = function (p) {
    var mode;
    var boundingSphere = false;
    var canRotate = true;
    var mouse = false;
    var solids = [];
    var totalObjs = 1;
    var radius = 200;


    p.setup = function () {
        var canvas = p.createCanvas(600, 600, p.WEBGL);
        canvas.parent('sketch-holder');
        init(DODECAHEDRON);
    };

    function init(type) {
        solids = [];
        for (var i = 0; i < totalObjs; i++) {
            solids.push(new PlatonicSolid(i * radius, i * radius, 1, radius, type, p));
        }
    }

    p.draw = function () {
        p.background(0);
        p.push();
        if (controls !== undefined) {
            controls.controle(p);
        }
        for (var i = 0; i < solids.length; i++) {
            var solid = solids[i];
            if (solid !== null) {
                solid.draw(p);
                if (boundingSphere) {
                    p.push();
                    p.specularMaterial(200, 0, 0);
                    p.sphere(solid.radius);
                    p.pop();
                }
            }
        }
        p.pop();
    };

    p.keyPressed = function () {
        var key = p.key;
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
    };
};

if (controls === undefined) {
    new p5(sketch);
}