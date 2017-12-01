function SphereEngine(sphereRadius) {
    this.r = sphereRadius;

    this.drawElement = function (object) {
        push();
        translate(0, 0, -this.r);
        translate(object.x, object.y, object.z);

        var angles = this.getTangentAngles(object);
        rotateY(radians(angles.angleY));
        rotateX(radians(angles.angleX));
        object.draw();

        pop();
    };

    this.getTangentAngles = function (object) {
        var angleX = 0, angleY;

        if (object.z >= 0) {
            angleY = map(object.x, 0, this.r, 180, 270);
        } else {
            angleY = -map(object.x, -this.r, this.r, 270, 450);
        }

        if (object.z >= 0) {
            angleX = -map(object.y, 0, this.r, 0, 90);
        } else {
            angleX = -map(object.y, -this.r, this.r, 270, 450);
        }
        return {angleX: angleX, angleY: angleY};
    };

    this.moveElement = function (object, tetha, phi) {
        var newX, newY, newZ;
        tetha = radians(tetha) % 360;
        phi = radians(phi) % 360;

        newX = this.r * sin(tetha) * cos(phi);
        newY = this.r * sin(tetha) * sin(phi);
        newZ = this.r * cos(tetha);

        object.x = newX;
        object.y = newY;
        object.z = newZ;
    };

    this.moveElementDirected = function (object, direction) {
        var angles = this.getAngles(object);
        this.moveElement(object, angles.tetha + direction.x, angles.phi + direction.y);
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
        angles.tetha = acos(object.z / this.r);
        angles.phi = asin(object.y / (this.r * sin(angles.tetha)));

        if (abs(sin(angles.tetha)) > 0) {
            if (object.x > 0) {
                angles.phi = asin(object.y / (this.r * sin(angles.tetha)));
            } else {
                angles.phi = -asin(object.y / (this.r * sin(angles.tetha)));
            }
        } else {
            angles.phi = 0;
        }
        angles.tetha = degrees(angles.tetha);
        angles.phi = degrees(angles.phi);

//        if (object.x < 0) {
//            angles.tetha = 360 - angles.tetha;
//        }
//
//        if (angles.phi < 0) {
//            angles.phi = 360 + angles.phi;
//        }
        return angles;
    };

}
