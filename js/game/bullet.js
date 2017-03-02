function Bullet(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.speed = 5;
    this.move = function () {
        this.y = this.y - this.speed;

    };
    this.draw = function () {
        fill('red');
        ellipse(this.x, this.y, this.r, this.r);
    }

    this.checkEnemy = function (enemyArray) {
         for(var i = 0; i < enemyArray.length; i++){
            var enemy = enemyArray[i];
            var dis = dist(this.x, this.y, enemy.x, enemy.y);

            if (dis <= 15) {
                enemy.destroyed = true;
            }
        }

    };
}
