function DisplayPixel(x, y, z, r, c) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
    this.color = c;
    this.draw = function (p) {
        if (arguments.length > 0) {
            p.push();
            p.translate(this.x, this.y, this.z);
            p.noStroke();
            p.fill(this.color);
            p.rect(0, 0, this.r, this.r);
            p.pop();
        } else {
            push();
            if (isFlat) {
                translate(this.x, this.y, 0);
            } else {
                translate(this.x, this.y, this.z);
            }
            ambientMaterial(this.color);
            sphere(this.r);
            pop();
        }
    };
}

