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
var dir = {x: 0, y: 0};

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
//    createEnemies();
    testPos();

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
    var initial;
    for (var i = 0; i < 36; i++) {
        var e = new Enemy(0, 0, 0, enemyModel, {r: 255, g: 0, b: 0});
        initial = 0;
        sEngine.moveElement(e, i * 10, initial);
        var angles = sEngine.getAngles(e);
        console.assert((abs(initial - angles.phi) - 0.0001) < 0, "phi must be " + initial + ", but found " + angles.phi
                + " object posx " + e.x + " posy " + e.y + " posz " + e.z);
        console.assert((abs(i * 10 - angles.tetha) - 0.0001) < 0, "tetha must be " + (i * 10) + ", but found " + angles.tetha
                + " object posx " + e.x + " posy " + e.y + " posz " + e.z);
        enemyArray.push(e);
    }

    for (var i = 0; i < 36; i++) {
        var e = new Enemy(0, 0, 0, enemyModel, {r: 255, g: 255, b: 0});
        initial = 135;
        sEngine.moveElement(e, i * 10, initial);
        var angles = sEngine.getAngles(e);
        console.assert((abs(initial - angles.phi) - 0.0001) < 0, "phi must be " + initial + ", but found " + angles.phi
                + " object posx " + e.x + " posy " + e.y + " posz " + e.z);
        console.assert((abs(i * 10 - angles.tetha) - 0.0001) < 0, "tetha must be " + (i * 10) + ", but found " + angles.tetha
                + " object posx " + e.x + " posy " + e.y + " posz " + e.z);
        enemyArray.push(e);
    }

//    for (var i = 0; i < 36; i++) {
//        var e = new Enemy(0, 0, 0, enemyModel, {r: 0, g: 0, b: 255});
//        initial = 45;
//        sEngine.moveElement(e, initial, i * 10);
//        var angles = sEngine.getAngles(e);
//        console.assert((abs(i * 10 - angles.phi) - 0.0001) < 0, "phi must be " + (i * 10) + ", but found " + angles.phi
//                + " object posx " + e.x + " posy " + e.y + " posz " + e.z);
//        console.assert((abs(initial - angles.tetha) - 0.0001) < 0, "tetha must be " + initial + ", but found " + angles.tetha
//                + " object posx " + e.x + " posy " + e.y + " posz " + e.z);
//
//        enemyArray.push(e);
//    }
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

//    sEngine.moveElement(ship, 180 * (mouseX - width / 2) / (width / 2), 180 * (mouseY - height / 2) / (height / 2));
//    sEngine.moveElementDirected(ship, dir);


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

function bindKeys() {
    if (keyIsPressed) {
        switch (keyCode) {
            case UP_ARROW:
                dir = {x: 0, y: -1};
//                console.log("up");
                break;
            case DOWN_ARROW:
                dir = {x: 0, y: 1};
//                console.log("down");
                break;
            case LEFT_ARROW:
                dir = {x: -1, y: 0};
                //must rotate
//                console.log("left");
                break;
            case RIGHT_ARROW:
                dir = {x: 1, y: 0};
//                console.log("rights");
                break;
        }

    }
}

function mouseClicked() {
    if (bullets.length < maxBullets) {
        var b = new Bullet(0, 0, 0);
        var angles = sEngine.getAngles(ship);
        sEngine.putObject(b, angles.tetha, angles.phi);
        angles = sEngine.getAngles(b);
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

function keyReleased() {
    keyIsPressed = false;
}