function Bullet(x, y, z, m) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.shape = m;
    this.r = 10;
    this.speed = 5;
    this.move = function () {
        this.y = this.y - this.speed;

    };
    this.draw = function () {
        push();
        translate(this.x, this.y, this.z);
        specularMaterial(0, 255, 255);
        sphere(10);
//        fill('blue');
//        ellipse(this.x, this.y, this.r, this.r);
        pop();
    };

    this.checkEnemy = function (enemyArray) {
        for (var i = 0; i < enemyArray.length; i++) {
            var enemy = enemyArray[i];
            var dis = dist(this.x, this.y, enemy.x, enemy.y);
            if (dis <= 15) {
                enemy.destroyed = true;
            }
        }

    };
}
