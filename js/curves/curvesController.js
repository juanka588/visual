// global variables
// modes: 0 natural cubic spline; 1 Hermite;
// 2 Catmull-Rom; 3 (degree 7) Bezier; 4 Cubic Bezier
var mode = 0;

var grabber = null;
var tGrabber = null;
var drawGridCtrl = true;
var drawCtrl;

var cFit = null;
var cAprox = null;
var cHermite = null;
var cBezier = null;
var isFix = false;
var poly;


var controls = new Controls();

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    textSize(20);
    drawGridCtrl = true;
    drawCtrl = true;
    cFit = new CurveFit(4);
    cAprox = new CurveAprox(4);
    cHermite = new CurveHermite(4);
    cBezier = new CurveBezier(7);
    cFit.setup();
    cAprox.setup();
    cHermite.setup();
    cBezier.setup();
    controls.setCustom("curves/customControls.html");
}

function drawGrid(gScale) {
    push();
    if (docReady === true) {
        //mode = document.getElementById("curveMode").value;
    } else {
        // mode = 6;
    }
    controls.controle();
    strokeWeight(1);
    var i;
    for (i = 0; i <= width / gScale; i++) {
        stroke(0, 0, 0, 20);
        line(i * gScale, 0, i * gScale, height);
    }
    for (i = 0; i <= height / gScale; i++) {
        stroke(0, 0, 0, 20);
        line(0, i * gScale, width, i * gScale);
    }
    pop();
}

function draw() {
    background('grey');
    if (drawGridCtrl) {
        drawGrid(10);
    }
    if (cFit === null && cAprox === null && cHermite === null) {
        return;
    }
    if (mode === 0) {
        poly = cFit.poly;

    } else if (mode === 1) {
        poly = cHermite.poly;
    } else if (mode === 2) {
        poly = cBezier.poly;

    } else if (mode === 3) {
        poly = cAprox.poly;
    }
    if (poly) {
        poly.draw();
    }
    drawMode(mode);
}

function drawMode() {
    text("mode: " + mode, width - 100, 30);
    noFill();
    strokeWeight(3);
    stroke(0, 255, 0);
    switch (mode) {
        case 0:
            cFit.draw();
            break;

        case 1:
            cHermite.draw();
            break;
        case 2:
            cBezier.draw();
            break;
        case 3:
            cAprox.draw();
            break;
    }
}


function keyPressed() {
    if (key == 'G')
    {
        drawGridCtrl = !drawGridCtrl;
    }
    if (key == 'C')
    {
        drawCtrl = !drawCtrl;
    }
    if (keyCode === RIGHT_ARROW) {
        mode++;
    }
    if (keyCode === LEFT_ARROW) {
        mode--;
        if (mode === -1) {
            mode = 3;
        }
    }
    mode = mode % 4;
}

function mousePressed() {
    if (drawCtrl) {
        for (var i = 0; i < poly.points.length; i++) {
            var p = poly.points[i];
            if (grabber === null) {
                if (p.grabsInput(mouseX, mouseY)) {
                    grabber = p;
                }
            }
        }
        if (mode === 1) {
            for (var i = 0; i < cHermite.cPoints.length; i++) {
                var p = cHermite.cPoints[i];
                if (tGrabber === null) {
                    if (p.grabsInput(mouseX, mouseY)) {
                        tGrabber = p;
                    }
                }
            }
        }
    } else {
        grabber = null;
        tGrabber = null;
    }
}

function mouseDragged() {
    if (grabber !== null) {
        switch (grabber.type) {
            case "CENTER":
                break;
            case "LEFT":
                var right = poly.points[grabber.index + 2];
                var center = poly.points[grabber.index + 1];
                var dir = center.dist(grabber, center);
                var newR = dir.add(center, dir.mult(dir, -1));
                right.x = newR.x;
                right.y = newR.y;
                break;
            case "RIGHT":
                var left = poly.points[grabber.index - 2];
                var center = poly.points[grabber.index - 1];
                var dir = center.dist(grabber, center);
                var newL = dir.add(center, dir.mult(dir, -1));
                left.x = newL.x;
                left.y = newL.y;
                break;
        }
        grabber.x = mouseX;
        grabber.y = mouseY;
    }
    if (tGrabber !== null) {
        tGrabber.x = mouseX;
        tGrabber.y = mouseY;
    }
}

function mouseReleased() {
    grabber = null;
    tGrabber = null;
}
