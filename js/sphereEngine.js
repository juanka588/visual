function SphereEngine(sphereRadius) {
    this.r = sphereRadius;

    this.drawElement = function (object) {
        push();

        var pos = createVector(object.x, object.y, object.z);
        var xLine = createVector(1, 0, 0);
//        fill(0, 255, 255);
//        box(30, 10, 10);
        var angleb = p5.Vector.angleBetween(pos, xLine);
        console.log(degrees(angleb));

        var rAxis = xLine.cross(pos);
//        console.log(rAxis);
//        fill(255, 0, 255);
//        box(10, 10, 30);

        translate(object.x, object.y, object.z);
        rotateX(map(object.y, -this.r, this.r, radians(-100), radians(100)));
        rotateY(map(object.x, -this.r, this.r, radians(-100), radians(100)));
//        rotate(angleb, xLine);
//        rotateY(radians(90));

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

}