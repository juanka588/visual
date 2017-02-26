/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var illusions = 7;
var current = 5;
var active = true;

var fishIllusion = new fishesIllusion();
var sigmaM = new sigmaMotion();
var reverseM = new reverseMotion();
var chaserM = new chaser();
var rampM = new ramp();
var motionBid = new motionBiding();

function setup() {
    createCanvas(600, 600);
    fishIllusion.setup();
    reverseM.setup();
    chaserM.setup();
    //noLoop();
}

function draw() {
    background(255);
    push();
    switch (current) {
        case 1:
            scintillating();
            break;
        case 2:
            fishIllusion.draw();
            break;
        case 3:
            sigmaM.draw();
            break;
        case 4:
            reverseM.draw();
            break;
        case 5:
            chaserM.draw();
            break;
        case 6:
            rampM.draw();
            break;
        case 7:
            motionBid.draw();
            break;
    }
    pop();
}

function keyPressed() {
    if (key == ' ') {
        current = current < illusions ? current + 1 : 1;
        return false;
    }
    if (key === 'A') {
        active = !active;
    }
}

// illusions
function scintillating() {
    background(0); // black background

    //style
    strokeWeight(3); // medium weight lines 
    smooth(); // antialias lines
    stroke(100, 100, 100); // dark grey colour for lines

    var step = 25; // grid spacing

    //vertical lines
    for (var x = step; x < width; x = x + step) {
        line(x, 0, x, height);
    }

//horizontal lines
    for (var y = step; y < height; y = y + step) {
        line(0, y, width, y);
    }

// Circles
    if (active) {
        ellipseMode(CENTER);
        stroke(255, 255, 255); // white circles
        for (var i = step; i < width - 5; i = i + step) {
            for (var j = step; j < height - 15; j = j + step) {
                strokeWeight(6);
                point(i, j);
                strokeWeight(3);
            }
        }
    }
}


