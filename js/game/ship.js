function Ship(x, y, z, m) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.shape = m;
    this.len = 30;
    this.speed = 3;
    this.headAngle = 0;

    this.draw = function () {
        push();
        specularMaterial(0, 255, 0);
//        plane(this.len);
        rotateX(radians(90));
        rotateZ(radians(180));
        scale(0.3, 0.3, 0.3);

        rotateY(radians(this.headAngle));
        
//        model(this.shape);
          sphere(this.len);
        pop();
    };
}
