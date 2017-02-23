/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Y_AXIS = 1;
var X_AXIS = 2;
var fish;
function setup() {
    createCanvas(600, 600);
    fish = new Fish(100, 100);
    //noLoop();
}

function draw() {
    background(255,0,0);
    fish.draw();
}
