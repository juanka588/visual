/**
 * Created by Juan Camilo on 29/03/2017.
 */
var controls = new Controls();

var sketch = function (p) {
    var angle;
    var length;
    var step;

    p.setup = function () {
        var canvas = p.createCanvas(600, 600, p.WEBGL);
        canvas.parent('sketch-holder');
        angle = p.PI / 4;
        length = 50;
        step = 10;
        p.background(255, 0, 255);
    };

    p.draw = function () {
        angle = (document.getElementById('angleInput').value / 180) * p.PI;
        step = (document.getElementById('stepInput').value);
        p.background(0);
        p.push();
        controls.controle(p);
        fractal(length, 1);
        p.pop();
    };


    function fractal(size, dir) {
        if (size < 10) {
            return;
        }
        p.push();
        var shift = {x: size, y: size, z: size};
        p.strokeWeight(2);
        p.stroke(255);
        p.colorMode(p.HSB);
        p.specularMaterial(size + length % 255, 255, 255);
//    rotateX(frameCount * 0.01);
        p.sphere(dir * size);
        p.push();
        p.translate(dir * size + shift.x, 0 + shift.y, dir * size + shift.z);
        p.rotateZ(angle);
//    rotateX(frameCount * 0.01);
        p.sphere(dir * size);
        fractal(size - step, dir);
        p.pop();
        p.push();
        p.translate(0 + shift.x, dir * size + shift.y, dir * size + shift.z);
        p.rotateZ(-angle);
//    rotateX(frameCount * 0.01);
        p.sphere(dir * size);
        fractal(size - step, dir);
        p.pop();
        p.pop();
    }

};



if (controls === undefined) {
    new p5(sketch);
}