/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function fishesIllusion() {
    this.fishes = [];
    this.cylinders = [];
    this.setup = function () {
        this.fishes[0] = new Fish(50, 50);
        this.fishes[1] = new Fish(200, 105);
        this.fishes[2] = new Fish(350, 400);
        this.fishes[3] = new Fish(50, 500);
        this.fishes[4] = new Fish(90, 300);
        this.fishes[5] = new Fish(500, 400);
        this.fishes[6] = new Fish(400, 300);
        for (var i = 0; i < width / 10; i++) {
            this.cylinders[i] = new Cylinder(i + width * i / 10, 0, i % 2);
        }
    };

    this.draw = function () {
        background(255);
        if (active) {
            for (var i = 0; i < this.cylinders.length; i++) {
                this.cylinders[i].move();
                this.cylinders[i].draw();
            }
        }
        for (var i = 0; i < this.fishes.length; i++) {
            this.fishes[i].draw();
        }
    };
}

