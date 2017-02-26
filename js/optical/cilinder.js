function Cylinder(x, y, dir) {
    this.x = x;
    this.y = y;
    this.length;
    this.velocity = 10;
    this.draw = function () {
        if (dir === 0) {
            setGradient(this.x, this.y, width / 10, height, color(255), color(0), X_AXIS);
        } else {
            setGradient(this.x, this.y, width / 10, height, color(0), color(255), X_AXIS);
        }
     
    };
    this.move = function () {
        this.x -= this.velocity;
    };
}
