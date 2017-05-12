function Enemy(x, y, z, m) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.shape = m;

    this.destroyed = false;

    this.len = 10;

    this.draw = function () {
        push();
        translate(this.x, this.y, this.z);
        specularMaterial(255, 0, 0);
//        model(this.shape);
        box(50);

//        triangle(this.x, this.y - this.len,
//                this.x - this.len / 2, this.y + this.len / 2,
//                this.x + this.len / 2, this.y + this.len / 2
//                );
        pop();
    };
}
