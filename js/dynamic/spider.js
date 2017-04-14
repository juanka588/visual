function Spider(x, y, z, size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.dir = 1;
    this.speed = 0.9;
    this.isMoving = false;
    this.tmp = {x: 0, y: 0};
    this.draw = function () {
        var angle = ((this.z / (this.size + (width * 2))) + 1) * PI / 2 - PI / 2;
        if (this.y > 0) {
            angle = angle * -1;
        }
        push();
        translate(this.x, this.y, this.z);
        push();
        rotateX(angle);
        this.drawBody();
//        specularMaterial(250, 120, 60);
//        translate(0, 0, -this.size);
//        plane(400, 400);
        pop();
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
        rotateX(angle);
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

    this.move = function (r, vel) {
        if (this.isMoving) {
            this.tmp.x += vel.x;
            this.tmp.y += vel.y;
            this.tmp.x = this.tmp.x % 360;
            this.tmp.y = this.tmp.y % 360;
            //vel tetha and alpha
            var tetha;//= acos(this.z / r);
            tetha = PI * (this.tmp.x) / 180;
            var alpha;//= 2 * asin(this.y / (sqrt(this.x * this.x + this.y * this.y) + this.x));
            alpha = PI * (this.tmp.y) / 180;
            this.x = r * sin(tetha) * sin(alpha);
            this.y = r * cos(tetha) * sin(alpha);
            this.z = r * cos(alpha) - r;
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