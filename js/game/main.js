/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var bullets = new Array();
var ship;
var enemyArray = new Array();
var controls = new Controls();
var maxBullets = 10;
var shipModel;
var enemyModel;
var bulletModel;
var worldSize;
var NORMAL = 0, FP = 1;
var cameraMode = 1;

function setup() {
    var canvas = createCanvas(600, 600, WEBGL);
    canvas.parent('sketch-holder');
//    shipModel = loadModel('assets/spider/Only_Spider_with_Animations_Export.obj');
//    enemyModel = loadModel('assets/spider/Only_Spider_with_Animations_Export.obj');

    enemyArray.push(new Enemy(0, 0, 0, enemyModel));
    ship = new Ship(0, 0, 0, shipModel);


}
function draw() {
    push();
    controls.controle();
    drawMainGame();
    drawWorld();
    pop();
}

function drawWorld() {
    push();
    translate(0, 0, -worldSize);
    specularMaterial(120, 120, 120, 120);
    sphere(worldSize);
    pop();
//    if (cameraMode === FP) {
        camera(ship.x, ship.y, ship.z);
//    }
}

function drawMainGame() {
    push();
    background(0);
    worldSize = 230;
    ship.draw();
    for (var i = enemyArray.length - 1; i >= 0; i--) {
        if (enemyArray[i].destroyed) {
//            enemyArray.splice(i, 1);
        } else {
            enemyArray[i].draw();
        }
    }
    ship.move(worldSize, {x: (mouseX - width / 2) / (width / 2), y: (mouseY - height / 2) / (height / 2)});
    for (var i = bullets.length - 1; i >= 0; i--) {
        bullets[i].move(worldSize);
        bullets[i].draw();
        bullets[i].checkEnemy(enemyArray);
        if (bullets[i].maxLife < 0) {
            bullets.splice(i, 1);
        }
    }
    pop();
}

function mouseClicked() {
    if (bullets.length <= maxBullets) {
        bullets.push(new Bullet(ship.x, ship.y - 50, 0));
    } else {
        bullets.splice(0, 1);
    }
}

