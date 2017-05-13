function Enemy(x, y, z, m) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.shape = m;

    this.destroyed = false;

    this.len = 10;

    this.draw = function () {
        push();
        translate(this.x, this.y, this.z + this.len);
        specularMaterial(255, 0, 0);
//        model(this.shape);
        box(50);

//        triangle(this.x, this.y - this.len,
//                this.x - this.len / 2, this.y + this.len / 2,
//                this.x + this.len / 2, this.y + this.len / 2
//                );
        pop();
    };
//    this.move = function (r, vel) {
//        if (this.isMoving) {
//            this.tmp.x += vel.x;
//            this.tmp.y += vel.y;
//            this.tmp.x = this.tmp.x % 360;
//            this.tmp.y = this.tmp.y % 360;
//            //vel tetha and alpha
//            var tetha;//= acos(this.z / r);
//            tetha = PI * (this.tmp.x) / 180;
//            var alpha;//= 2 * asin(this.y / (sqrt(this.x * this.x + this.y * this.y) + this.x));
//            alpha = PI * (this.tmp.y) / 180;
//            this.x = r * sin(tetha) * sin(alpha);
//            this.y = r * cos(tetha) * sin(alpha);
//            this.z = r * cos(alpha) - r;
//        }
//    };
}
