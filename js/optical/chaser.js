/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function chaser() {
    this.r = 200;
    this.subRad = 60;
    this.stept = 40;
    this.center;
    this.count = 0;
    this.velocity = 10;
    this.setup = function () {
        this.center = {x: width / 2, y: height / 2};
    };

    this.draw = function () {
        background(255);
        var angle;
        var x;
        var y;
        stroke(0);
        line(this.center.x - 10, this.center.y, this.center.x + 10, this.center.y);
        line(this.center.x, this.center.y - 10, this.center.x, this.center.y + 10);
        for (var i = 0; i <= 360 / this.stept; i++) {
            angle = i * this.stept;
            x = this.center.x + this.r * cos(-angle * PI / 180);
            y = this.center.y + this.r * sin(-angle * PI / 180);
            if (i !== ((this.count / this.velocity) >> 0)) {
                radialGradient(x, y, this.subRad, color("#E82AFF"), color(255));
            }
            console.log(i);
        }
        console.log("chaser : ");
        console.log((this.count / this.velocity) >> 0);
        this.count++;
        if (this.count / this.velocity >= (360 / this.stept) + 1) {
            this.count = 0;
        }
    };
}


