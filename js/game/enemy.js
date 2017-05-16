function Enemy(x, y, z, m, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.shape = m;
    this.color = color;

    this.destroyed = false;

    this.len = 30;
    this.base = 5;

    this.draw = function () {
        push();
        specularMaterial(255, 0, 0);
//        rotateX(radians(90));
//        scale(0.3, 0.3, 0.3);
//        model(this.shape);
//        translate(0, 0, this.len / 2);
        box(this.base, this.base, this.len);
        fill(color.r, color.g, color.b, 200);
//        sphere(this.base);
        plane(this.len, this.len);
        pop();
    };
}
