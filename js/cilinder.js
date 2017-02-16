function Cilinder(x, y) {
    this.x = x;
    this.y = y;
    this.length;
    this.color = 125;
    this.draw = function () {

        setGradient(this.x-this.radius/2, this.y+this.radius/4,
        this.radius, this.radius/2,
        color(255), color(0), Y_AXIS);
        stroke(255);
        ellipse(this.x, this.y, this.radius, this.radius / 2);
    };
}
