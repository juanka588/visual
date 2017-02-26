/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function ramp() {
    this.init = 80;
    this.finish = 180;
    this.count = this.init;
    this.speed = 1;
    this.draw = function () {
        var intColor = (this.count / this.speed >> 0);
        background('gray');
        stroke(0);
        line(width / 2 - 10, height / 2, width / 2 + 10, height / 2);
        line(width / 2, height / 2 - 10, width / 2, height / 2 + 10);
        fill(color(255 - intColor));
        rect(width * 0.1, height * 0.05, width * 0.8, height * 0.4);
        fill(color(intColor));
        rect(width * 0.1, height * 0.55, width * 0.8, height * 0.4);
        if (active) {
            this.count++;
        }
        if (this.count / this.speed > this.finish + 1) {
            this.count = this.init;
        }
    };
}

