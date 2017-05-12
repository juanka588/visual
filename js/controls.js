var docReady = false;
var zoom = 0;
var maxZoom = 1000;
var minZoom = -1000;
function createElements() {
    $.get("controlsView.html", function (data) {
//        console.log(data);
        var sk = $("#sketch-holder");
        $(".main-container").html(data);
        $("#sketch-container").append(sk);
//        alert("Load was performed.");
        addListeners();
        docReady = true;
    });
}

function addListeners() {
    $('.collapsible').collapsible();
    $(".button-collapse").sideNav();
    $('select').material_select();
    $('.modal').modal(
            {complete: function () {
                    var id = $(this)[0].id;
                    //console.log("done for id: " + id);
                    switch (id) {
                        case"pointModal":
                            lightToApply = 1;
                            break;
                        case"dirModal":
                            lightToApply = 2;
                            break;
                    }
                }});
    $("#light-selector").change(function () {
        if ($("#amLight").is(":checked")) {
            lightToApply = 0;
        }
        if ($("#ptLight").is(":checked")) {
            $('#pointModal').modal('open');
        }
        if ($("#dirLight").is(":checked")) {
            $('#dirModal').modal('open');
        }
    });
}



/**
 * 
 * @type Number 0 ambient, 1 point, 2 directional
 */
var lightToApply = 2;
/**
 * 
 * @type Number 0 normalMaterial 1 specularMaterial 2 ambientMaterial 
 */
var materialType = "1";

function Controls() {
    createElements();
    this.axeAngleX;
    this.axeAngleY;
    this.axeAngleZ;

    this.currentPos = {x: 0, y: 0, z: 0};

    this.lightColor;
    this.materialColor;
    this.dirX;
    this.dirY;
    this.dirZ;

    this.orbitControIsEnabled = false;

    this.spacing = 10;
    this.axisMagnitude = 100;

    this.drawAxis = function () {
        this.drawXAxis();
        this.drawYAxis();
        this.drawZAxis();
    };
    this.drawXAxis = function () {
        push();
        box(this.axisMagnitude, 10);
        pop();
    };
    this.drawYAxis = function () {
        push();
        box(this.axisMagnitude, 10);
        pop();
    };
    this.drawZAxis = function () {
        push();
        box(this.axisMagnitude, 10);
        pop();
    };

    this.setCustom = function (html) {
        $.get(html, function (data) {
            $(".custom-controls").html(data);
        });
    };

    this.controle = function () {
        if (!docReady) {
            return;
        }
        var enabled3D = true;
        this.getInputValues();
        this.applyZoom();
        try {
            if (this.orbitControIsEnabled) {
                this.mouseControls();
            }
            camera(this.currentPos.x, this.currentPos.y, this.currentPos.Z);
            rotateY(this.axeAngleY);
            rotateX(this.axeAngleX);
            rotateZ(this.axeAngleZ);
        }
        catch (e) {
            rotate(this.axeAngleX);
            enabled3D = false;
        }
        if (!enabled3D) {
            return;
        }
        this.applyLightsAndMaterials();

    };

    this.applyLightsAndMaterials = function () {
        this.lightColor = hexToRGB(document.getElementById('light-color').value);
        this.materialColor = document.getElementById('material-color').value;
        var locY = (mouseY / height - 0.5) * (-2);
        var locX = (mouseX / width - 0.5) * 2;
        switch (lightToApply) {
            case 0:
                ambientLight(50);
                break;
            case 1:
                this.dirX = document.getElementById('pointLightX').value;
                this.dirY = document.getElementById('pointLightY').value;
                this.dirZ = document.getElementById('pointLightZ').value;
                pointLight(this.lightColor.R, this.lightColor.G, this.lightColor.B, locX, locY, 0);
                break;
            case 2:
                this.dirX = document.getElementById('dirLightX').value;
                this.dirY = document.getElementById('dirLightY').value;
                this.dirZ = document.getElementById('dirLightZ').value;
                directionalLight(this.lightColor.R, this.lightColor.G, this.lightColor.B, 0.25, 0.25, 0.25);
                break;
        }
        materialType = document.getElementById('material-type').value;
        switch (materialType) {
            case "0":
                normalMaterial();
                break;
            case "1":
                specularMaterial(this.materialColor);
                break;
            case "2":
                ambientMaterial(this.materialColor);
                break;
        }
    };

    this.getInputValues = function () {
        this.axeAngleX = (document.getElementById('axeAngleX').value / 180) * PI;
        this.axeAngleY = (document.getElementById('axeAngleY').value / 180) * PI;
        this.axeAngleZ = (document.getElementById('axeAngleZ').value / 180) * PI;

        this.currentPos.x = (document.getElementById('cameraX').value / 180) * PI;
        this.currentPos.y = (document.getElementById('cameraY').value / 180) * PI;
        this.currentPos.z = (document.getElementById('cameraZ').value / 180) * PI;

        this.orbitControIsEnabled = document.getElementById("orbitControlsEnabled").checked;

    };

    this.applyZoom = function () {
        var scl = map(zoom, -1000, 1000, 0.01, 3);
        scale(scl, scl, scl);
    };

    this.mouseControls = function () {
        if (isMousePressed) {
            if (mouseButton == LEFT) {
                this.axeAngleY = (mouseX - width / 2) / (width / 2);
                this.axeAngleX = (mouseY - height / 2) / (width / 2);
//                document.getElementById('axeAngleX').noUiSlider.set(this.axeAngleX);
//                document.getElementById('axeAngleY').noUiSlider.set(this.axeAngleY);
            }
            if (mouseButton == RIGHT) {
                this.currentPos.x = mouseX - width / 2;
                this.currentPos.y = mouseY - height / 2;
//                document.getElementById('cameraX').noUiSlider.set(this.currentPos.x);
//                document.getElementById('cameraY').noUiSlider.set(this.currentPos.y);
            }
        }
    };
}

function mouseWheel(event) {
    print(event.delta);
    //move the square according to the vertical scroll amount
    zoom += event.delta;
    if (zoom >= maxZoom) {
        zoom = maxZoom;
    } else if (zoom <= minZoom) {
        zoom = minZoom;
    }
    //uncomment to block page scrolling
    return false;
}

function hexToRGB(hex, alphaYes) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, hex.length / 3), 16);
    var g = parseInt(hex.substring(hex.length / 3, 2 * hex.length / 3), 16);
    var b = parseInt(hex.substring(2 * hex.length / 3, 3 * hex.length / 3), 16);
    if (alphaYes)
        return new ColorArray(r, g, b, 1);
    else
        return new ColorArray(r, g, b);
}
function ColorArray(R, G, B, A) {
    this.R = R;
    this.G = G;
    this.B = B;
    this.A = A;
}