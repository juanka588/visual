function Enemy(x, y) {
    this.x = x;
    this.y = y;
    this.destroyed = false; 
    
    this.len = 10;

    this.draw = function () {
        fill(255);
        triangle( this.x, this.y - this.len, 
        this.x - this.len/2, this.y + this.len/2,
        this.x + this.len/2, this.y + this.len/2
        );
    };
}
