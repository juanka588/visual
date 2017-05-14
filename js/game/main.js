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
var cameraMode = 0;
var maxEnemies = 4;


var enemyIndex = 0, trace = false;

function setup() {
    var canvas = createCanvas(600, 600, WEBGL);
    canvas.parent('sketch-holder');
    shipModel = loadModel('assets/spider/Only_Spider_with_Animations_Export.obj');
    enemyModel = loadModel('assets/spider/Only_Spider_with_Animations_Export.obj');

    worldSize = 120;

//    createEnemies();
    testPos();

    ship = new Ship(0, 0, 0, shipModel);
}

function createEnemies() {
    for (var i = 0; i < maxEnemies; i++) {
        var e = new Enemy(0, 0, 0, enemyModel, {r: 255, g: 255, b: 255});
        //alpha and tetha
        e.move(random(0, 180), random(0, 180), worldSize);
        enemyArray.push(e);
    }

}

function testPos() {
    var e = new Enemy(0, 0, 0, enemyModel, {r: 255, g: 0, b: 0});
    e.move(90, 0, worldSize);
    enemyArray.push(e);

    var e = new Enemy(0, 0, 0, enemyModel, {r: 255, g: 0, b: 0});
    e.move(45, 0, worldSize);
    enemyArray.push(e);

    var e = new Enemy(0, 0, 0, enemyModel, {r: 0, g: 255, b: 255});
    e.move(0, 90, worldSize);
    enemyArray.push(e);

    var e = new Enemy(0, 0, 0, enemyModel, {r: 0, g: 255, b: 255});
    e.move(0, 45, worldSize);
    enemyArray.push(e);

}


function draw() {
    push();
    controls.controle();
    if (cameraMode == FP) {
        camera(ship.x, ship.y, ship.z);
//    ortho(-width/2, width/2, height/2, -height/2, 0, 1000);
    } else {
        translate(0, 0, -worldSize);
    }
    if (trace) {
        camera(enemyArray[enemyIndex].x, enemyArray[enemyIndex].y, enemyArray[enemyIndex].z - 350);
    }
    drawMainGame();
    drawWorld();
    pop();
}

function drawWorld() {
    push();
    translate(0, 0, -worldSize);
    specularMaterial(120, 120, 120, 10);
    sphere(worldSize);
    pop();
}

function drawMainGame() {
    push();
    background(255);
//    ship.draw();
    for (var i = enemyArray.length - 1; i >= 0; i--) {
        enemyArray[i].draw();
        if (enemyArray[i].destroyed) {
//            enemyArray.splice(i, 1);
        }
    }
//    ship.move(worldSize, {x: (mouseX - width / 2) / (width / 2), y: (mouseY - height / 2) / (height / 2)});
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
//    if (bullets.length <= maxBullets) {
//        bullets.push(new Bullet(ship.x, ship.y - 50, 0));
//    } else {
//        bullets.splice(0, 1);
//    }
}


function keyPressed() {
    if (key === "A") {
        console.log("espacio");
        trace = true;
        enemyIndex++;
        enemyIndex = enemyIndex % enemyArray.length;
    }
    return false;
}
