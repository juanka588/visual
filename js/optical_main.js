/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Y_AXIS = 1;
var X_AXIS = 2;
var illusions = 7;
var current = 4;
var active = true;
var fishes = [];
var cylinders = [];
var count = 0;

function setup() {
    createCanvas(800, 800);
    fishes[0] = new Fish(100, 100);
    fishes[1] = new Fish(400, 210);
    fishes[2] = new Fish(350, 600);
    fishes[3] = new Fish(50, 700);
    fishes[4] = new Fish(90, 500);
    fishes[5] = new Fish(500, 400);
    fishes[6] = new Fish(600, 300);
    for (var i = 0; i < width / 10; i++) {
        cylinders[i] = new Cylinder(i + width * i / 10, 0, i % 2);
    }
    //noLoop();
}

function draw() {
    background(255);
    switch (current) {
        case 1:
            scintillating();
            break;
            // implement from here. Don't forget to add break for each case
        case 2:
            fishesIllusion();
            break;
        case 3:
            sigmaMotion();
            break;
        case 4:
            reverseMotion();
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            //println("implementation is missed!");
            break;
    }
}

function reverseMotion() {
    background(255);
    var r = 200;
    var stept = 100;
    var last = {x: width / 2 - r, y: height / 2};
    var next = null;
    var xTemp;
    for (var i = 0; i < (2 * r + width / 2) / stept; i++) {
        xTemp = ((width / 2 - r) + i * stept) - 2 * r;
        next = {x: xTemp, y: Math.sqrt((r * r) - (xTemp * xTemp))};
        console.log(next);
        triangle(width / 2, height / 2, last.x, last.y, next.x, next.y);
        last = next;
    }
    noLoop();
}

function sigmaMotion() {
    background(255);
    var div = 20;
    var color = 255;
    var colorNeg = 0;
    console.log(count);
    if (count < 2) {
        color = 0;
        colorNeg = 255;
    }
    for (var i = 0; i < width / div; i++) {
        if (i % 2 === 0) {
            fill(color);
        } else {
            fill(colorNeg);
        }
        rect(i + width * i / div, 0, width / div, height);
    }
    if (active) {
        count++;
        count = count % 4;
    }
}

function fishesIllusion() {
    background(255);
    if (active) {
        for (var i = 0; i < cylinders.length; i++) {
            cylinders[i].move();
            cylinders[i].draw();
        }
    }
    for (var i = 0; i < fishes.length; i++) {
        fishes[i].draw();
    }
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


