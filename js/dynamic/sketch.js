var controls = new Controls();
var sketch = function (p) {
    var gray = 0;

    p.setup = function () {
        var canvas = p.createCanvas(600, 600);
        canvas.parent('sketch-holder');
    };

    p.draw = function () {
        p.background(gray);
        p.push();
        controls.controle(p);
        p.rect(p.width / 2, p.height / 2, 200, 200);
        p.pop();
    };

    p.mousePressed = function () {
        gray = (gray + 16) % 256;
    };
};

if (controls === undefined) {
    new p5(sketch);
}

