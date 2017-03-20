
var TETRAHEDRON = 1, CUBE = 2, OCTAHEDRON = 3, DODECAHEDRON = 4, ICOSAHEDRON = 5;

function PVector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function PlatonicSolid(r, type) {
    this.radius = r;
    this.vertices = [];
    this.faces = [];
    this.type = type;
    this.strokeWeight = 2;
    this.init = function () {
        this.buildShape();
    };
    this.buildShape = function () {
        switch (this.type) {
            case TETRAHEDRON:
                Tetrahedron(this);
                break;
            case CUBE:
                Cube(this);
                break;
            case OCTAHEDRON:
                Octahedron(this);
                break;
            case DODECAHEDRON:
                Dodecahedron(this);
                break;
            case ICOSAHEDRON:
                Icosahedron(this);
                break;
        }
    };
    this.drawImmediate = function () {
        beginShape(TRIANGLES);
        fill(0, 0, 255, 255);
        noStroke();
        var v;
        for (var i = 0; i < this.faces.length; i++) {
            v = this.faces[i];
            vertex(this.radius * v.x, this.radius * v.y, this.radius * v.z);
        }
        endShape(CLOSE);
    };
    this.draw = function () {
        push();
        strokeWeight(this.strokeWeight);
        stroke(255, 255, 0);
        fill(255, 0, 255, 100, 125);
        this.drawImmediate();
        pop();
    };
    this.init();

}

/**
 * 
 * @param {Platonic Solid} ps
 * @returns created shape
 */
function Tetrahedron(ps) {
    var ratio = sqrt(6) / 4.22;
    var v1 = new PVector(1 * ratio, 1 * ratio, 1 * ratio);
    var v2 = new PVector(-1 * ratio, -1 * ratio, 1 * ratio);
    var v3 = new PVector(-1 * ratio, 1 * ratio, -1 * ratio);
    var v4 = new PVector(1 * ratio, -1 * ratio, -1 * ratio);
    ps.vertices.push(v1);
    ps.vertices.push(v2);
    ps.vertices.push(v3);
    ps.vertices.push(v4);

    //face 1
    ps.faces.push(v1);
    ps.faces.push(v2);
    ps.faces.push(v3);

    //face 2
    ps.faces.push(v1);
    ps.faces.push(v3);
    ps.faces.push(v4);

    //face 3
    ps.faces.push(v1);
    ps.faces.push(v4);
    ps.faces.push(v2);

    //face 4
    ps.faces.push(v4);
    ps.faces.push(v3);
    ps.faces.push(v2);
}

function Cube(ps) {
    var v1 = new PVector(-1 / sqrt(3), -1 / sqrt(3), -1 / sqrt(3));
    var v2 = new PVector(-1 / sqrt(3), -1 / sqrt(3), 1 / sqrt(3));
    var v3 = new PVector(-1 / sqrt(3), 1 / sqrt(3), -1 / sqrt(3));
    var v4 = new PVector(-1 / sqrt(3), 1 / sqrt(3), 1 / sqrt(3));
    var v5 = new PVector(1 / sqrt(3), -1 / sqrt(3), -1 / sqrt(3));
    var v6 = new PVector(1 / sqrt(3), -1 / sqrt(3), 1 / sqrt(3));
    var v7 = new PVector(1 / sqrt(3), 1 / sqrt(3), -1 / sqrt(3));
    var v8 = new PVector(1 / sqrt(3), 1 / sqrt(3), 1 / sqrt(3));

    ps.vertices.push(v1);
    ps.vertices.push(v2);
    ps.vertices.push(v3);
    ps.vertices.push(v4);
    ps.vertices.push(v5);
    ps.vertices.push(v6);
    ps.vertices.push(v7);
    ps.vertices.push(v8);

    //face 1 
    ps.faces.push(v4);
    ps.faces.push(v3);
    ps.faces.push(v1);
    ps.faces.push(v4);
    ps.faces.push(v1);
    ps.faces.push(v2);

    //face 2 
    ps.faces.push(v1);
    ps.faces.push(v3);
    ps.faces.push(v5);
    ps.faces.push(v3);
    ps.faces.push(v5);
    ps.faces.push(v7);

    //face 3 
    ps.faces.push(v7);
    ps.faces.push(v5);
    ps.faces.push(v8);
    ps.faces.push(v5);
    ps.faces.push(v6);
    ps.faces.push(v8);

    //face 4 
    ps.faces.push(v4);
    ps.faces.push(v3);
    ps.faces.push(v7);
    ps.faces.push(v4);
    ps.faces.push(v7);
    ps.faces.push(v8);

    //face 5 
    ps.faces.push(v2);
    ps.faces.push(v1);
    ps.faces.push(v5);
    ps.faces.push(v2);
    ps.faces.push(v5);
    ps.faces.push(v6);

    //face 6
    ps.faces.push(v2);
    ps.faces.push(v6);
    ps.faces.push(v8);
    ps.faces.push(v2);
    ps.faces.push(v4);
    ps.faces.push(v8);
}

function Octahedron(ps) {
    var v1 = new PVector(-1, 0, 0);
    var v2 = new PVector(0, 1, 0);
    var v3 = new PVector(0, 0, -1);
    var v4 = new PVector(0, 0, 1);
    var v5 = new PVector(0, -1, 0);
    var v6 = new PVector(1, 0, 0);

    ps.vertices.push(v1);
    ps.vertices.push(v2);
    ps.vertices.push(v3);
    ps.vertices.push(v4);
    ps.vertices.push(v5);
    ps.vertices.push(v6);

    //face 1 
    ps.faces.push(v2);
    ps.faces.push(v6);
    ps.faces.push(v3);

    //face 2
    ps.faces.push(v3);
    ps.faces.push(v6);
    ps.faces.push(v5);

    //face 3
    ps.faces.push(v3);
    ps.faces.push(v5);
    ps.faces.push(v1);

    //face 4
    ps.faces.push(v3);
    ps.faces.push(v1);
    ps.faces.push(v2);

    //face 5
    ps.faces.push(v4);
    ps.faces.push(v2);
    ps.faces.push(v6);

    //face 6
    ps.faces.push(v4);
    ps.faces.push(v6);
    ps.faces.push(v5);

    //face 7
    ps.faces.push(v4);
    ps.faces.push(v5);
    ps.faces.push(v1);

    //face 8
    ps.faces.push(v4);
    ps.faces.push(v1);
    ps.faces.push(v2);
}

function Dodecahedron(ps) {
    var max = 0.93;
    var ratio1 = 1.618033; //golden mean
    var ratio2 = 0.618033;

    var v1 = new PVector(0, ratio2, ratio1);
    var v2 = new PVector(0, ratio2, -ratio1);
    var v3 = new PVector(0, -ratio2, ratio1);
    var v4 = new PVector(0, -ratio2, -ratio1);
    var v5 = new PVector(ratio1, 0, ratio2);
    var v6 = new PVector(ratio1, 0, -ratio2);
    var v7 = new PVector(-ratio1, 0, ratio2);
    var v8 = new PVector(-ratio1, 0, -ratio2);
    var v9 = new PVector(ratio2, ratio1, 0);
    var v10 = new PVector(ratio2, -ratio1, 0);
    var v11 = new PVector(-ratio2, ratio1, 0);
    var v12 = new PVector(-ratio2, -ratio1, 0);
    var v13 = new PVector(1.0, 1.0, 1.0);
    var v14 = new PVector(1.0, 1.0, -1.0);
    var v15 = new PVector(1.0, -1.0, 1.0);
    var v16 = new PVector(1.0, -1.0, -1.0);
    var v17 = new PVector(-1.0, 1.0, 1.0);
    var v18 = new PVector(-1.0, 1.0, -1.0);
    var v19 = new PVector(-1.0, -1.0, 1.0);
    var v20 = new PVector(-1.0, -1.0, -1.0);

    ratio1 = ratio1 / max;

    v1 = div(v1, ratio1);
    v2 = div(v2, ratio1);
    v3 = div(v3, ratio1);
    v4 = div(v4, ratio1);
    v5 = div(v5, ratio1);
    v6 = div(v6, ratio1);
    v7 = div(v7, ratio1);
    v8 = div(v8, ratio1);
    v9 = div(v9, ratio1);
    v10 = div(v10, ratio1);
    v11 = div(v11, ratio1);
    v12 = div(v12, ratio1);
    v13 = div(v13, ratio1);
    v14 = div(v14, ratio1);
    v15 = div(v15, ratio1);
    v16 = div(v16, ratio1);
    v17 = div(v17, ratio1);
    v18 = div(v18, ratio1);
    v19 = div(v19, ratio1);
    v20 = div(v20, ratio1);

    ps.vertices.push(v1);
    ps.vertices.push(v2);
    ps.vertices.push(v3);
    ps.vertices.push(v4);
    ps.vertices.push(v5);
    ps.vertices.push(v6);
    ps.vertices.push(v7);
    ps.vertices.push(v8);
    ps.vertices.push(v9);
    ps.vertices.push(v10);
    ps.vertices.push(v11);
    ps.vertices.push(v12);
    ps.vertices.push(v13);
    ps.vertices.push(v14);
    ps.vertices.push(v15);
    ps.vertices.push(v16);
    ps.vertices.push(v17);
    ps.vertices.push(v18);
    ps.vertices.push(v19);
    ps.vertices.push(v20);

    //face 1 
    ps.faces.push(v4);
    ps.faces.push(v16);
    ps.faces.push(v6);
    ps.faces.push(v4);
    ps.faces.push(v6);
    ps.faces.push(v2);
    ps.faces.push(v6);
    ps.faces.push(v2);
    ps.faces.push(v14);

    //face 2 
    ps.faces.push(v4);
    ps.faces.push(v20);
    ps.faces.push(v8);
    ps.faces.push(v4);
    ps.faces.push(v8);
    ps.faces.push(v18);
    ps.faces.push(v4);
    ps.faces.push(v2);
    ps.faces.push(v18);

    //face 3
    ps.faces.push(v2);
    ps.faces.push(v18);
    ps.faces.push(v14);
    ps.faces.push(v18);
    ps.faces.push(v11);
    ps.faces.push(v14);
    ps.faces.push(v11);
    ps.faces.push(v9);
    ps.faces.push(v14);

    //face 4
    ps.faces.push(v4);
    ps.faces.push(v20);
    ps.faces.push(v16);
    ps.faces.push(v16);
    ps.faces.push(v20);
    ps.faces.push(v12);
    ps.faces.push(v16);
    ps.faces.push(v10);
    ps.faces.push(v12);

    //face 5
    ps.faces.push(v14);
    ps.faces.push(v6);
    ps.faces.push(v9);
    ps.faces.push(v6);
    ps.faces.push(v9);
    ps.faces.push(v5);
    ps.faces.push(v9);
    ps.faces.push(v13);
    ps.faces.push(v5);

    //face 6
    ps.faces.push(v11);
    ps.faces.push(v18);
    ps.faces.push(v8);
    ps.faces.push(v11);
    ps.faces.push(v8);
    ps.faces.push(v7);
    ps.faces.push(v11);
    ps.faces.push(v7);
    ps.faces.push(v17);

    //face 7
    ps.faces.push(v7);
    ps.faces.push(v8);
    ps.faces.push(v20);
    ps.faces.push(v7);
    ps.faces.push(v20);
    ps.faces.push(v12);
    ps.faces.push(v7);
    ps.faces.push(v12);
    ps.faces.push(v19);

    //face 8
    ps.faces.push(v6);
    ps.faces.push(v16);
    ps.faces.push(v10);
    ps.faces.push(v6);
    ps.faces.push(v10);
    ps.faces.push(v15);
    ps.faces.push(v6);
    ps.faces.push(v15);
    ps.faces.push(v5);

    //face 9
    ps.faces.push(v12);
    ps.faces.push(v19);
    ps.faces.push(v3);
    ps.faces.push(v12);
    ps.faces.push(v3);
    ps.faces.push(v10);
    ps.faces.push(v10);
    ps.faces.push(v3);
    ps.faces.push(v15);

    //face 10
    ps.faces.push(v11);
    ps.faces.push(v1);
    ps.faces.push(v17);
    ps.faces.push(v11);
    ps.faces.push(v13);
    ps.faces.push(v1);
    ps.faces.push(v11);
    ps.faces.push(v9);
    ps.faces.push(v13);

    //face 11
    ps.faces.push(v3);
    ps.faces.push(v19);
    ps.faces.push(v7);
    ps.faces.push(v3);
    ps.faces.push(v7);
    ps.faces.push(v17);
    ps.faces.push(v3);
    ps.faces.push(v17);
    ps.faces.push(v1);

    //face 12
    ps.faces.push(v1);
    ps.faces.push(v13);
    ps.faces.push(v5);
    ps.faces.push(v1);
    ps.faces.push(v5);
    ps.faces.push(v15);
    ps.faces.push(v1);
    ps.faces.push(v15);
    ps.faces.push(v3);

}

function div(pVector, ratio) {
    return new PVector(pVector.x / ratio, pVector.y / ratio, pVector.y / ratio);
}

function Icosahedron(ps) {
    var ratio1 = 0.525731;
    var ratio2 = 0.850650;
    var v1 = new PVector(-ratio1, 0, ratio2);
    var v2 = new PVector(ratio1, 0, ratio2);
    var v3 = new PVector(-ratio1, 0, -ratio2);
    var v4 = new PVector(ratio1, 0, -ratio2);
    var v5 = new PVector(0, ratio2, ratio1);
    var v6 = new PVector(0, ratio2, -ratio1);
    var v7 = new PVector(0, -ratio2, ratio1);
    var v8 = new PVector(0, -ratio2, -ratio1);
    var v9 = new PVector(ratio2, ratio1, 0);
    var v10 = new PVector(-ratio2, ratio1, 0);
    var v11 = new PVector(ratio2, -ratio1, 0);
    var v12 = new PVector(-ratio2, -ratio1, 0);

    ps.vertices.push(v1);
    ps.vertices.push(v2);
    ps.vertices.push(v3);
    ps.vertices.push(v4);
    ps.vertices.push(v5);
    ps.vertices.push(v6);
    ps.vertices.push(v7);
    ps.vertices.push(v8);
    ps.vertices.push(v9);
    ps.vertices.push(v10);
    ps.vertices.push(v11);
    ps.vertices.push(v12);

    //face 1 
    ps.faces.push(v3);
    ps.faces.push(v4);
    ps.faces.push(v8);

    //face 2 
    ps.faces.push(v3);
    ps.faces.push(v6);
    ps.faces.push(v4);

    //face 3
    ps.faces.push(v6);
    ps.faces.push(v5);
    ps.faces.push(v9);

    //face 4
    ps.faces.push(v4);
    ps.faces.push(v6);
    ps.faces.push(v9);

    //face 5
    ps.faces.push(v4);
    ps.faces.push(v8);
    ps.faces.push(v11);

    //face 6
    ps.faces.push(v4);
    ps.faces.push(v9);
    ps.faces.push(v11);

    //face 7
    ps.faces.push(v5);
    ps.faces.push(v6);
    ps.faces.push(v10);

    //face 8
    ps.faces.push(v10);
    ps.faces.push(v3);
    ps.faces.push(v12);

    //face 9
    ps.faces.push(v10);
    ps.faces.push(v6);
    ps.faces.push(v3);

    //face 10
    ps.faces.push(v12);
    ps.faces.push(v3);
    ps.faces.push(v8);

    //face 11
    ps.faces.push(v8);
    ps.faces.push(v11);
    ps.faces.push(v7);

    //face 12
    ps.faces.push(v11);
    ps.faces.push(v2);
    ps.faces.push(v9);

    //face 13
    ps.faces.push(v12);
    ps.faces.push(v1);
    ps.faces.push(v10);

    //face 14
    ps.faces.push(v12);
    ps.faces.push(v8);
    ps.faces.push(v7);

    //face 15
    ps.faces.push(v1);
    ps.faces.push(v7);
    ps.faces.push(v12);

    //face 16
    ps.faces.push(v2);
    ps.faces.push(v11);
    ps.faces.push(v7);

    //face 17
    ps.faces.push(v1);
    ps.faces.push(v5);
    ps.faces.push(v10);

    //face 18
    ps.faces.push(v2);
    ps.faces.push(v5);
    ps.faces.push(v9);

    //face 19
    ps.faces.push(v1);
    ps.faces.push(v2);
    ps.faces.push(v7);

    //face 20
    ps.faces.push(v1);
    ps.faces.push(v2);
    ps.faces.push(v5);
}