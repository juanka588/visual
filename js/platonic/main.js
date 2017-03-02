/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var counter = 0;
function setup() {
    createCanvas(600, 600, WEBGL);
}

function draw() {
    translate(counter, counter, counter);
    background(200);
    rotateX(frameCount * 0.1);
    rotateY(frameCount * 0.1);
    box(30, 30, 30);
    counter++;
}
