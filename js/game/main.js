/**
 * 
 * enemies
 */
var maxEnemies = 4;
var enemyModel;
var enemyArray = new Array();
var tempColor;
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
var dir = 0;

/**
 * game options
 */
var cameraMode = 0;
var NORMAL = 0, FP = 1;
var enemyIndex = 0, trace = false;

/***
 * 
 * sound
 */
var bulletSound, explosionSound;
function preload() {
    bulletSound = loadSound('assets/laser_shot.mp3');
    explosionSound = loadSound('assets/explosion.mp3');
}

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

    //img = loadImage("images/direction.png");

    worldSize = 230;

    sEngine = new SphereEngine(worldSize);
    createEnemies();
//    testPos();

    ship = new Ship(0, 0, 0, shipModel);
    sEngine.putObject(ship, 0, 0);
}

function createEnemies() {
    for (var i = 0; i < maxEnemies; i++) {
        var e = new Enemy(0, 0, 0, enemyModel, {r: 255, g: 0, b: 0});
        enemyArray.push(e);
        sEngine.putObject(e);
    }

}

function testPos() {
    var initial;
//    for (var i = 0; i < 36; i++) {
//        var e = new Enemy(0, 0, 0, enemyModel, {r: 255, g: 0, b: 0});
//        initial = 0;
//        sEngine.moveElement(e, i * 10, initial);
//        var angles = sEngine.getAngles(e);
//        console.assert((abs(initial - angles.phi) - 0.0001) < 0, "phi must be " + initial + ", but found " + angles.phi
//                + " object posx " + e.x + " posy " + e.y + " posz " + e.z);
//        console.assert((abs(i * 10 - angles.tetha) - 0.0001) < 0, "tetha must be " + (i * 10) + ", but found " + angles.tetha
//                + " object posx " + e.x + " posy " + e.y + " posz " + e.z);
//        enemyArray.push(e);
//    }

//    for (var i = 0; i < 36; i++) {
//        var e = new Enemy(0, 0, 0, enemyModel, {r: 255, g: 255, b: 0});
//        //could be from -90 to 90 -->0 to 180
//        initial = 45;
//        sEngine.moveElement(e, i * 10, initial);
//        var angles = sEngine.getAngles(e);
//        console.assert((abs(initial - angles.phi) - 0.0001) < 0, "phi must be " + initial + ", but found " + angles.phi
//                + " object posx " + e.x + " posy " + e.y + " posz " + e.z + " tetha " + angles.tetha);
//        console.assert((abs(i * 10 - angles.tetha) - 0.0001) < 0, "tetha must be " + (i * 10) + ", but found " + angles.tetha
//                + " object posx " + e.x + " posy " + e.y + " posz " + e.z);
//        enemyArray.push(e);
//    }

//    for (var i = 0; i < 36; i++) {
//        var e = new Enemy(0, 0, 0, enemyModel, {r: 0, g: 0, b: 255});
//        //could be from -180 to 180 --> 0 to 360
//        initial = 45;
//        sEngine.moveElement(e, initial, i * 10);
//        var angles = sEngine.getAngles(e);
//        console.assert((abs(i * 10 - angles.phi) - 0.0001) < 0, "phi must be " + (i * 10) + ", but found " + angles.phi
//                + " object posx " + e.x + " posy " + e.y + " posz " + e.z + " with tetha: " + angles.tetha);
//        console.assert((abs(initial - angles.tetha) - 0.0001) < 0, "tetha must be " + initial + ", but found " + angles.tetha
//                + " object posx " + e.x + " posy " + e.y + " posz " + e.z + " with phi: " + angles.phi);
//
//        enemyArray.push(e);
//    }
    for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 36; j++) {
            var e = new Enemy(0, 0, 0, enemyModel, {r: i * 10, g: j * 10, b: i * j * 10});
            sEngine.moveElement(e, i * 10, j * 10);
            enemyArray.push(e);
        }
    }

}


function draw() {
    push();
    controls.controle();
    if (cameraMode == FP) {
        camera(ship.x, ship.y, ship.z);
        var angles = sEngine.getTangentAngles(ship);
//        rotateY(-radians(angles.angleY+90));
//        rotateX(radians(angles.angleX - 90));
    } else {
        translate(0, 0, -worldSize);
    }
    if (trace) {
        if (enemyIndex > -1) {
            camera(enemyArray[enemyIndex].x, enemyArray[enemyIndex].y, enemyArray[enemyIndex].z - 350);
            tempColor = enemyArray[enemyIndex].color;
            enemyArray[enemyIndex].color = {r: 255, g: 255, b: 0};
            if (enemyIndex - 1 >= 0) {
                enemyArray[enemyIndex - 1].color = tempColor;
            } else {
                enemyArray[enemyArray.length - 1].color = tempColor;
            }
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

    for (var i = enemyArray.length - 1; i >= 0; i--) {
        sEngine.drawElement(enemyArray[i]);
        if (enemyArray[i].destroyed) {
            enemyArray.splice(i, 1);
            enemyIndex = -1;
            explosionSound.setVolume(0.1);
            explosionSound.play();
        }
    }

    bindKeys();

    var angles = sEngine.getAngles(ship);
    sEngine.moveElement(ship, angles.tetha + dir, ship.headAngle);
    sEngine.drawElement(ship);

    for (var i = bullets.length - 1; i >= 0; i--) {
        angles = sEngine.getAngles(bullets[i]);
        sEngine.moveElement(bullets[i], angles.tetha - 1, angles.phi);
        sEngine.drawElement(bullets[i]);
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
                dir = -ship.speed;
                break;
            case DOWN_ARROW:
                dir = ship.speed;
                break;
            case LEFT_ARROW:
                ship.headAngle++;
                break;
            case RIGHT_ARROW:
                ship.headAngle--;
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
        bulletSound.setVolume(0.1);
        bulletSound.play();
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
    dir = 0;
}