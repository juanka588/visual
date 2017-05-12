function Ship(x, y, z, m) {
    this.x = x - 50;
    this.y = y - 50;
    this.z = z;
    this.shape = m;
    this.len = 10;
    this.move = function (x) {
        this.x = x;
    };
    this.draw = function () {
        push();
        translate(this.x, this.y, this.z);
        specularMaterial(0, 255, 0);
//        rect(this.x, this.y, this.len, 10);
//        model(this.shape);
        sphere(20);
        pop();
    };
}
