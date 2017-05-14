function Enemy(x, y, z, m, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.shape = m;
    this.color = color;

    this.destroyed = false;

    this.len = 30;
    this.base = 20;

    this.draw = function () {
        push();
        translate(this.x, this.y, this.z);

        var pos = createVector(this.x, this.y, this.z);
        var xLine = createVector(1, 0, 0);
        var angleb = p5.Vector.angleBetween(pos, xLine);
        var rAxis = xLine.cross(pos);
        rotate(-angleb, rAxis);
        rotateY(radians(90));
//        rotateX(radians(90));
//        specularMaterial(255, 0, 0);
//        model(this.shape);
//        box(2, 2, this.len);
//        box(this.len);
        specularMaterial(color.r, color.g, color.b, 120);
        plane(this.len, this.len);
        pop();
    };

    this.move = function (alpha, tetha, r) {
        alpha = radians(alpha) + PI / 2;
        tetha = radians(tetha) + PI;
        this.x = r * sin(tetha) * sin(alpha);
        this.y = r * cos(tetha) * sin(alpha);
        this.z = r * cos(alpha) - r;
    };
}
