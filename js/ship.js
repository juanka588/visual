function Ship(x, y) {
    this.x = x - 50;
    this.y = y - 50;
    this.len = 10;
    this.move = function (x) {
        this.x = x;
    };
    this.draw = function () {
        fill(255);
        rect(this.x, this.y, this.len, 10);
    };
}
