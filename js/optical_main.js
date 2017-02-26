/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Y_AXIS = 1;
var X_AXIS = 2;
var illusions = 7;
var current = 5;
var active = true;
var fishes = [];
var cylinders = [];
var count = 0;
var countReverse = 0;
var countChaser = 9 * 10;

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
            chaser();
            break;
        case 6:
            break;
        case 7:
            //println("implementation is missed!");
            break;
    }
}

function chaser() {
    background(255);
    var r = 200;
    var subRad = 60;
    var stept = 40;
    var center = {x: width / 2, y: height / 2};
    var angle;
    var x;
    var y;
    stroke(0);
    line(center.x - 10, center.y, center.x + 10, center.y);
    line(center.x, center.y - 10, center.x, center.y + 10);
    for (var i = 0; i <= 360 / stept; i++) {
        angle = i * stept;
        x = center.x + r * cos(-angle * PI / 180);
        y = center.y + r * sin(-angle * PI / 180);
        if (i !== ((countChaser / 10) >> 0)) {
            radialGradient(x, y, subRad, color("#E82AFF"), color(255));
        }
        console.log(i);
    }
    console.log("chaser : ");
    console.log((countChaser / 10) >> 0);
    countChaser++;
    if (countChaser / 10 >= (360 / stept) + 1) {
        countChaser = 10;
    }
    noLoop();
}

function reverseMotion() {
    background(255);
    var r = 200;
    var stept = 20;
    var center = {x: width / 2, y: height / 2};
    var angle = 0;
    var x = center.x + r * cos(-angle * PI / 180);
    var y = center.y + r * sin(-angle * PI / 180);
    var last = {x: x, y: y};
    var next = null;
    var c1 = color("#949E97");
    var c2 = color("#555954");
    var colors = [];
    for (var i = 0; i <= 360 / stept; i++) {
        var inter = map(i, 0, 360 / stept, 0, 1);
        var c = lerpColor(c1, c2, inter);
        colors[i] = c;
    }
    for (var i = 1; i <= 360 / stept; i++) {
        angle = i * stept;
        x = center.x + r * cos(-angle * PI / 180);
        y = center.y + r * sin(-angle * PI / 180);
        next = {x: x, y: y};
        fill(colors[abs(i + countReverse) % colors.length]);
        strokeWeight(2);
        if (!active) {
            stroke('#fae');
        } else {
            stroke('gray');
        }
        triangle(center.x, center.y, last.x, last.y, next.x, next.y);
        last = next;
    }
    countReverse++;
    if (countReverse > 360 / stept) {
        countReverse = 0;
    }
}

function sigmaMotion() {
    background(255);
    var div = 20;
    var color = 255;
    var colorNeg = 0;
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


