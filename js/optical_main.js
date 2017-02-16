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

function setGradient(x, y, w, h, c1, c2, axis, r) {

    noFill();

    if (axis == Y_AXIS) {  // Top to bottom gradient
        for (var i = y; i <= y + h; i++) {
            var inter = map(i, y, y + h, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis == X_AXIS) {  // Left to right gradient
        for (var i = x; i <= x + w; i++) {
            var inter = map(i, x, x + w, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}

function setGradientEllipse(x, y, w, h, c1, c2, axis, r) {

    noFill();

    if (axis == Y_AXIS) {  // Top to bottom gradient
        for (var i = y; i <= y + h; i++) {
            var inter = map(i, y-h, y + h, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            var w2 = (w * Math.sqrt(Math.pow(h,2) - Math.pow(i-y,2))) / h;
         
            line(x - w2, i, x + w2, i);
            
            inter = map(i, y-h, y + h, 0, 1);
            c = lerpColor(c2, c1, inter);
            stroke(c);
            line(x - w2, 2*y-i, x + w2, 2*y-i);
           
        }
    } else if (axis == X_AXIS) {  // Left to right gradient
        for (var i = x; i <= x + w; i++) {
            var inter = map(i, x, x + w, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}