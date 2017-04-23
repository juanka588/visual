function DisplayPixel(x, y, z, r, c) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
    this.color = c;
    this.draw = function () {
        noStroke();
        fill(this.color);
        rect(x, y, this.r, this.r);
    };
}

