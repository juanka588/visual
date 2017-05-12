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


function setup() {
    var canvas = createCanvas(600, 600, WEBGL);
    canvas.parent('sketch-holder');
//    shipModel = loadModel('assets/spider/Only_Spider_with_Animations_Export.obj');
//    enemyModel = loadModel('assets/spider/Only_Spider_with_Animations_Export.obj');

    enemyArray.push(new Enemy(0, 0, 0, enemyModel));
    ship = new Ship(0, height / 2, 0, shipModel);


}
function draw() {
    push();
    controls.controle();
    background(255);
    ship.draw();
    for (var i = enemyArray.length - 1; i >= 0; i--) {
        if (enemyArray[i].destroyed) {
            enemyArray.splice(i, 1);
        } else {
            enemyArray[i].draw();

        }
    }
    ship.move(mouseX - width / 2);
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].move();
        bullets[i].draw();
        bullets[i].checkEnemy(enemyArray);
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

