var controls = new Controls();

var sketch = function (p) {
    var angle;
    var length;
    var step;

    p.setup = function () {
        var canvas = p.createCanvas(600, 600);
        canvas.parent('sketch-holder');
        angle = p.PI / 4;
        length = 40;
        step = 10;
        p.background(255, 0, 255);
    };

    p.draw = function () {
        angle = (document.getElementById('angleInput').value / 180) * p.PI;
        step = (document.getElementById('stepInput').value);
        p.background(0);
        p.push();
        controls.controle(p);
        p.push();
        p.translate(p.width / 2, p.height);
        fractal(60, -1);
        p.pop();
        p.push();
        p.translate(p.width / 2, 0);
        fractal(60, 1);
        p.pop();
        p.pop();
    };

    function fractal(size, dir) {
        if (size < 10) {
            return;
        }
        p.push();
        p.stroke(255);
        p.strokeWeight(2);
        p.line(0, 0, 0, dir * length);
        p.push();
        p.translate(0, dir * length);
        p.rotate(angle);
        p.line(0, 0, 0, dir * length);
        fractal(size - step, dir);
        p.pop();
        p.push();
        p.translate(0, dir * length);
        p.rotate(-angle);
        p.line(0, 0, 0, dir * length);
        fractal(size - step, dir);
        p.pop();
        p.pop();
    }
};

if (controls === undefined) {
    new p5(sketch);
}