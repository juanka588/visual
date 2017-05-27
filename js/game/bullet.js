function Bullet(x, y, z, m) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.shape = m;
    this.r = 10;

    this.maxLife = 500;

    this.vel = {x: 0, y: -1};
    this.tmp = {x: this.x, y: this.y};

    this.live = function () {
        this.maxLife--;
    };

    this.draw = function () {
        push();
//        translate(0, 0, this.r);
        specularMaterial(0, 255, 255);
        sphere(this.r);
        pop();
    };

    this.checkEnemy = function (enemyArray) {
        for (var i = 0; i < enemyArray.length; i++) {
            var enemy = enemyArray[i];
            var dis = dist(this.x, this.y, this.z, enemy.x, enemy.y, enemy.z);
            if (dis <= enemy.len + this.r) {
                enemy.destroyed = true;
                this.maxLife = -1;
            }
        }

    };
}
