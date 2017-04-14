var controls = new Controls();

var spider;
var batman;
var img;
var world;
var destination;
var velocity;

function setup() {
    var canvas = createCanvas(600, 600, WEBGL);
    canvas.parent('sketch-holder');
    spider = new Spider(0, 0, 0, 100);
//    batman = loadModel('assets/spider/Only_Spider_with_Animations_Export.obj');
//    batman = loadModel("assets/Batman/BatmanArmoured.obj");
//    img = loadImage("assets/spider/textures/Spinnen_Bein_tex.jpg");
    img = loadImage("images/cur-texture.jpg");
    world = loadImage("images/grass.jpg");
}
function draw() {
    background("gray");
    push();
    translate(-spider.x, -spider.y, 0);
    specularMaterial("red");
    controls.controle();
    push();
    texture(img);
    spider.draw();
    spider.move(destination, velocity);
    pop();
    push();
    translate(0, 0, -width * 2 - spider.size);
    texture(world);
    sphere(width * 2);
//    model(batman);
    pop();
}
function keyPressed() {
    if (key === "W") {
        if (spider.isMoving) {
            spider.isMoving = false;
        } else {
            spider.isMoving = true;
            destination = {x: spider.x, y: spider.y - spider.size};
            velocity = {x: 0, y: -3};
        }
    }
}