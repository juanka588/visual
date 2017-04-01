/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var bullets = new Array();
var ship;
var enemyArray = new Array();
function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    enemyArray.push(new Enemy(width / 2, height / 2));
    ship = new Ship(width / 2, height);

}
function draw() {
    background(0);
    ship.draw();
    for (var i = 0; i < enemyArray.length; i++) {

        if (enemyArray[i].destroyed) {
            //TODO: mustbe removed
        } else {
            enemyArray[i].draw();

        }
    }
    ship.move(mouseX);
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].move();
        bullets[i].draw();
        bullets[i].checkEnemy(enemyArray);
    }
}
function mouseClicked() {
    bullets.push(new Bullet(mouseX, height - 50));
}

