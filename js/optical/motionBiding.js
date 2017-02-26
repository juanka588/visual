/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function motionBiding() {
    this.side = 100;
    this.counter = 0;
    this.velocity = 1;
    this.r = 15;
    this.shadown = 100;
    this.center = {x: 0, y: 0};
    this.inverse = false;
    this.draw = function () {
        if (!this.inverse) {
            this.center.y = sqrt(this.r * this.r - this.center.x * this.center.x);
        } else {
            this.center.y = -sqrt(this.r * this.r - this.center.x * this.center.x);
        }
        background(255);
        translate(width / 2, height / 2);
        rotate(PI / 6.0);
        rectMode(RADIUS);
        noFill();
        strokeWeight(3);
        stroke(0);
        rect(this.center.x, this.center.y, this.side, this.side);
//        point(this.center.x, this.center.y);
//        strokeWeight(1);
//        ellipse(0, 0, this.r * 2, this.r * 2);
        if (!active) {
            fill('rgba(255,0,0, 0.25)');
        } else {
            fill(255);
        }
        noStroke();
        //corner1
        ellipse(-this.side, -this.side, this.shadown, this.shadown);
        //corner2
        ellipse(this.side, this.side, this.shadown, this.shadown);
        //corner3
        ellipse(-this.side, this.side, this.shadown, this.shadown);
        //corner4
        ellipse(this.side, -this.side, this.shadown, this.shadown);
        if (this.inverse) {
            this.counter--;
        } else {
            this.counter++;
        }
        this.center.x = this.counter / this.velocity;
        if (this.center.x >= this.r + 1) {
            this.inverse = true;
        } else if (this.center.x <= -this.r - 1) {
            this.inverse = false;
        }
    };
}

