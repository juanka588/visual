var controls = new Controls();

var gray = 0;
function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
}
function draw() {
    background(gray);
    push();
    controls.controle();
    rect(width / 2, height / 2, 200, 200);
    pop();
}

function mousePressed() {
    gray = (gray + 16) % 256;
}