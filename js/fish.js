function Fish(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 100;
    this.color = 125;
    this.draw = function () {

        setGradientEllipse(this.x, this.y,
        this.radius/2, this.radius/4, 
        color(255), color(0), Y_AXIS,this.radius);
        noStroke();
        ellipse(this.x, this.y, this.radius, this.radius / 2);
    };
}
