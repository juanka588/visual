function SphereEngine(sphereRadius) {
    this.r = sphereRadius;

    this.drawElement = function (object) {
        push();
        translate(0, 0, -this.r);
        translate(object.x, object.y, object.z);
        rotateX(map(object.y, -this.r, this.r, radians(-90), radians(90)));
        rotateY(map(object.x, -this.r, this.r, radians(-90), radians(90)));

        object.draw();

        pop();
    };

    this.moveElement = function (object, tetha, phi) {
        var newX, newY, newZ;
        tetha = radians(tetha);
        phi = radians(phi);

        newX = this.r * sin(tetha) * cos(phi);
        newY = this.r * sin(tetha) * sin(phi);
        newZ = this.r * cos(tetha);

        object.x = newX;
        object.y = newY;
        object.z = newZ;
    };

    this.putObject = function (object, tetha, phi) {
        if (!object) {
            console.warn("Not Object given");
            return;
        }
        if (arguments.length !== 3) {
            tetha = random(0, 180);
            phi = random(0, 360);
        }
        this.moveElement(object, tetha, phi);
    };

    this.getAngles = function (object) {
        var angles = {tetha: 0, phi: 0};
        angles.tetha = (degrees(acos(object.z / this.r)));
        angles.phi = (degrees(atan(object.x / object.y)));
        return angles;
    };

}