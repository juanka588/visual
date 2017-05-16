function Ship(x, y, z, m) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.shape = m;
    this.len = 20;

    this.draw = function () {
        push();
        translate(0, 0, this.len);
        rotateX(radians(90));
        specularMaterial(0, 255, 0);
        model(this.shape);
//        sphere(this.len);
        pop();
    };
}
