function Ship(x, y, z, m) {
    this.x = x - 50;
    this.y = y - 50;
    this.z = z;
    this.shape = m;
    this.len = 20;

//    this.vel = {x: 0, y: -1};
    this.tmp = {x: this.x, y: this.y};

    this.draw = function () {
        push();
        translate(this.x, this.y, this.z + this.len);
        specularMaterial(0, 255, 0);
//        rect(this.x, this.y, this.len, 10);
//        model(this.shape);
        sphere(this.len);
        pop();
    };

    this.move = function (r, vel) {
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
    };
}
