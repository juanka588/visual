/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function sigmaMotion() {
    this.count=0;
    
    this.draw = function () {
        background(255);
        var div = 20;
        var color = 255;
        var colorNeg = 0;
        if (this.count < 2) {
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
            this.count++;
            this.count = this.count % 4;
        }
    };

}
