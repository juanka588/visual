/**
 * 
 * enemies
 */
var maxEnemies = 4;
var enemyModel;
var enemyArray = new Array();

/**
 * 
 * bullets
 */
var bulletModel;
var maxBullets = 10;
var bullets = new Array();

/**
 * wordl
 */
var worldSize;

/**
 * ship
 */
var shipModel;
var ship;

/**
 * game options
 */
var cameraMode = 0;
var NORMAL = 0, FP = 1;
var enemyIndex = 0, trace = false;

/**
 * utils
 */
var sEngine;
var controls = new Controls();


function setup() {
    var canvas = createCanvas(600, 600, WEBGL);
    canvas.parent('sketch-holder');
    shipModel = loadModel('assets/spider/Only_Spider_with_Animations_Export.obj');
    enemyModel = loadModel('assets/spider/Only_Spider_with_Animations_Export.obj');

    worldSize = 230;

    sEngine = new SphereEngine(worldSize);
    createEnemies();
//    testPos();

    ship = new Ship(0, 0, 0, shipModel);
    sEngine.putObject(ship);
}

function createEnemies() {
    for (var i = 0; i < maxEnemies; i++) {
        var e = new Enemy(0, 0, 0, enemyModel, {r: 255, g: 0, b: 255});
        enemyArray.push(e);
        sEngine.putObject(e);
    }

}

function testPos() {
    for (var i = 0; i < 36; i++) {
        var e = new Enemy(0, 0, 0, enemyModel, {r: 255, g: 0, b: 0});
        sEngine.moveElement(e, i * 10, 45);
        enemyArray.push(e);
    }

    for (var i = 0; i < 36; i++) {
        var e = new Enemy(0, 0, 0, enemyModel, {r: 255, g: 255, b: 0});
        sEngine.moveElement(e, i * 10, 180);
        enemyArray.push(e);
    }

    for (var i = 0; i < 36; i++) {
        var e = new Enemy(0, 0, 0, enemyModel, {r: 0, g: 0, b: 255});
        sEngine.moveElement(e, 45, i * 10);
        enemyArray.push(e);
    }
}


function draw() {
    push();
    controls.controle();
    if (cameraMode == FP) {
        camera(ship.x, ship.y, ship.z);
        var angles = sEngine.getTangentAngles(ship);
        rotateY(radians(angles.angleY));
        rotateX(radians(angles.angleX));
    } else {
        translate(0, 0, -worldSize);
    }
    if (trace) {
        if (enemyIndex > -1) {
            camera(enemyArray[enemyIndex].x, enemyArray[enemyIndex].y, enemyArray[enemyIndex].z - 350);
        }
    }
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
}

function drawMainGame() {
    push();
    background(255);
    sEngine.drawElement(ship);

    for (var i = enemyArray.length - 1; i >= 0; i--) {
        sEngine.drawElement(enemyArray[i]);
        if (enemyArray[i].destroyed) {
            enemyArray.splice(i, 1);
            enemyIndex = -1;
        }
    }
    
    bindKeys();

    sEngine.moveElement(ship);

    for (var i = bullets.length - 1; i >= 0; i--) {
        var angles = sEngine.getAngles(bullets[i]);
        sEngine.drawElement(bullets[i]);
        sEngine.moveElement(bullets[i], angles.tetha - 1, angles.phi);
        bullets[i].live();
        bullets[i].checkEnemy(enemyArray);
        if (bullets[i].maxLife < 0) {
            bullets.splice(i, 1);
        }
    }

    pop();
}

function bindKeys(){
    if(keyIsPressed === true){
        if (keyCode == UP_ARROW) {
            
        }
    }
}

function mouseClicked() {
    if (bullets.length < maxBullets) {
        var b = new Bullet(0, 0, 0);
        var angles = sEngine.getAngles(ship);
        sEngine.putObject(b, 180, 260);
        angles = sEngine.getAngles(b);
        console.assert(angles.tetha === 180);
        console.assert(angles.phi === 0);
        bullets.push(b);
    }
}


function keyPressed() {
    if (key === "A") {
        trace = true;
        enemyIndex++;
        enemyIndex = enemyIndex % enemyArray.length;
    }
    if (key === "F") {
        cameraMode++;
        cameraMode = cameraMode % 2;
    }
    return false;
}
