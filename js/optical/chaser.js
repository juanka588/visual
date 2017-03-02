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
        var intCount = (this.count / this.velocity) >> 0;
        background(255);
        var angle;
        var x;
        var y;
        stroke(0);
        line(this.center.x - 10, this.center.y, this.center.x + 10, this.center.y);
        line(this.center.x, this.center.y - 10, this.center.x, this.center.y + 10);
        for (var i = 0; i < 360 / this.stept; i++) {
            angle = i * this.stept;
            x = this.center.x + this.r * cos(-angle * PI / 180);
            y = this.center.y + this.r * sin(-angle * PI / 180);
            if (i !== intCount) {
                radialGradient(x, y, this.subRad, color("#E82AFF"), color(255));
            }
        }
        if (active) {
            this.count++;
        }
        if (intCount >= 360 / this.stept) {
            this.count = 0;
        }
    };
}


