/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function reverseMotion() {
    this.count = 0;
    this.r = 200;
    this.stept = 20;
    this.center;
    this.c1;
    this.c2;
    this.colors = [];
    this.setup = function () {
        this.c1 = color("#949E97");
        this.c2 = color("#555954");
        this.center = {x: width / 2, y: height / 2};
        for (var i = 0; i <= 360 / this.stept; i++) {
            var inter = map(i, 0, 360 / this.stept, 0, 1);
            var c = lerpColor(this.c1, this.c2, inter);
            this.colors[i] = c;
        }
    };
    this.draw = function () {
        background(255);
        var angle = 0;
        var x = this.center.x + this.r * cos(-angle * PI / 180);
        var y = this.center.y + this.r * sin(-angle * PI / 180);
        var last = {x: x, y: y};
        var next = null;
        for (var i = 1; i <= 360 / this.stept; i++) {
            angle = i * this.stept;
            x = this.center.x + this.r * cos(-angle * PI / 180);
            y = this.center.y + this.r * sin(-angle * PI / 180);
            next = {x: x, y: y};
            fill(this.colors[abs(i + this.count) % this.colors.length]);
            strokeWeight(2);
            if (!active) {
                stroke('#fae');
            } else {
                stroke('gray');
            }
            triangle(this.center.x, this.center.y, last.x, last.y, next.x, next.y);
            last = next;
        }
        this.count++;
        if (this.count > 360 / this.stept) {
            this.count = 0;
        }
    };
}
