function Spider(x, y, z, size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.dir = 1;
    this.speed = 0.9;
    this.isMoving = false;
    this.draw = function () {
        push();
        translate(this.x, this.y, this.z);
        this.drawBody();
        if (this.isMoving) {
            var rotation = frameCount % 40;
            if (rotation === 0) {
                this.dir = -this.dir;
            }
            if (this.dir === -1) {
                rotation = 40 - rotation;
            }
        }
        translate(0, this.size / 3, 0);
        push();
        if (this.isMoving) {
            rotateZ(PI * -40 / 180);
            rotateZ(this.speed * PI * rotation / 180);
        }
        this.drawLeg(1);
        this.drawLeg(2);
        this.drawLeg(3);
        this.drawLeg(4);
        pop();
        push();
        if (this.isMoving) {
            rotateZ(this.speed * PI * rotation / 180);
        }
        this.drawLeg(5);
        this.drawLeg(6);
        this.drawLeg(7);
        this.drawLeg(8);
        pop();
        pop();
    };

    this.move = function (destination, vel) {
        if (this.isMoving) {
            this.x += vel.x;
            this.y += vel.y;
            if (dist(this.x, destination.x) <= vel.x + 10
                    && dist(this.y, destination.y) <= vel.y + 10) {
                this.isMoving = false;
            }
        }
    };

    this.drawBody = function () {
        push();
        sphere(this.size);
        translate(0, -120, 0);
        sphere(this.size - 30);
        pop();
    };

    this.drawLeg = function (n) {
        push();
        switch (n) {
            case 1:
                translate(-this.size, -this.size, 0);
                rotateZ(PI / 4);
                this.drawLine(this.size / 4, 1);
                break;
            case 2:
                translate(-this.size, this.size, 0);
                rotateZ(PI / 4);
                this.drawLine(this.size / 4, 1);
                break;
            case 3:
                translate(-this.size, -this.size / 4, 0);
                rotateZ(PI / 4);
                this.drawLine(this.size / 4, 1);
                break;
            case 4:
                translate(-this.size, 3 * this.size / 8, 0);
                rotateZ(PI / 4);
                this.drawLine(this.size / 4, 1);
                break;
            case 5:
                translate(this.size, 3 * this.size / 8, 0);
                rotateZ(-PI / 4);
                this.drawLine(this.size / 4, -1);
                break;
            case 6:
                translate(this.size, -this.size / 4, 0);
                rotateZ(-PI / 4);
                this.drawLine(this.size / 4, -1);
                break;
            case 7:
                translate(this.size, this.size, 0);
                rotateZ(-PI / 4);
                this.drawLine(this.size / 4, -1);
                break;
            case 8:
                translate(this.size, -this.size, 0);
                rotateZ(-PI / 4);
                this.drawLine(this.size / 4, -1);
                break;
        }
        pop();
    };

    this.drawLine = function (s, dir) {
        if (s >= 1) {
            sphere(s);
            translate(0, -s, -s);
            rotateZ(dir * PI / 7);
            this.drawLine(s - 3, dir);
        }
    };
}