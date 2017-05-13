function Bullet(x, y, z, m) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.shape = m;
    this.r = 10;

    this.maxLife = 1000;

    this.vel = {x: 0, y: -1};
    this.tmp = {x: this.x, y: this.y};

    this.move = function (r) {
        this.tmp.x += this.vel.x;
        this.tmp.y += this.vel.y;
        this.tmp.x = this.tmp.x % 360;
        this.tmp.y = this.tmp.y % 360;
        //vel tetha and alpha
        var tetha;//= acos(this.z / r);
        tetha = PI * (this.tmp.x) / 180;
        var alpha;//= 2 * asin(this.y / (sqrt(this.x * this.x + this.y * this.y) + this.x));
        alpha = PI * (this.tmp.y) / 180;
        this.x = r * sin(tetha) * sin(alpha);
        this.y = r * cos(tetha) * sin(alpha);
        this.z = r * cos(alpha) - r;
        this.maxLife--;
    };

    this.draw = function () {
        push();
        translate(this.x, this.y, this.z + this.r);
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
            }
        }

    };
}
