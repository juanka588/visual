var controls = new Controls();

var spiders = [];
var batman;
var img;
var world;
var worldSize;
var dirs = [];

function setup() {
    var canvas = createCanvas(600, 600, WEBGL);
    canvas.parent('sketch-holder');
    for (var i = 0; i < 5; i++) {
        spiders[i] = new Spider(0, i * 100, 0, 100);
        switch (i) {
//            case 0:
//                dirs[i] = {x: 0, y: -0.7};
//                break;
//            case 1:
//                dirs[i] = {x: 0, y: -0.3};
//                break;
            default:
                dirs[i] = {x: 0, y: -random(0.1, 1)};
                break;
        }
    }
//    batman = loadModel('assets/spider/Only_Spider_with_Animations_Export.obj');
//    batman = loadModel('assets/globe/globe.obj');
//    batman = loadModel("assets/Batman/BatmanArmoured.obj");
//    img = loadImage("assets/spider/textures/Spinnen_Bein_tex.jpg");
    img = loadImage("images/cur-texture.jpg");
    world = loadImage("images/grass.jpg");
}
function draw() {
    background("white");
    pointLight(255, 255, 255, 0, 0, 0);
//    rotateZ(frameCount * 0.01);
    push();
    worldSize = width * 2;
    translate(0, 0, -worldSize - spiders[0].size);
    specularMaterial("red");
    controls.controle();
    push();
    for (var i = 0; i < spiders.length; i++) {
        rotateZ(i * PI / 4);
        texture(img);
        push();
        spiders[i].draw(worldSize);
        pop();
        spiders[i].move(worldSize, dirs[i]);
    }
    pop();
    push();
    translate(0, 0, -worldSize - spiders[0].size);
//    texture(world);
    specularMaterial(120, 120, 120, 120);
//    rotateY(frameCount * 0.01);
//    model(batman);
    sphere(worldSize);
    pop();
    pop();
}
function keyPressed() {
    if (key === "W") {
        for (var i = 0; i < spiders.length; i++) {
            if (spiders[i].isMoving) {
                spiders[i].isMoving = false;
            } else {
                spiders[i].isMoving = true;
            }
        }
    }
}