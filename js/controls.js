var docReady = false;
var zoom = 0;
var maxZoom = 3000;
var minZoom = -1000;
var isDragging = false;

function createElements(navbarRef) {
    $.get("controlsView.html", function (data) {
//        console.log(data);
        var sk = $("#sketch-holder");
        $(".main-container").html(data);
        $("#sketch-container").append(sk);
        addListeners();
        docReady = true;
    });
    if (navbarRef) {
        $.get(navbarRef, function (data) {
            $("#navbar-container").append(data);
        });
    } else {
        $.get("navbar.html", function (data) {
            $("#navbar-container").append(data);
        });
    }
}

function addListeners() {
    $('.collapsible').collapsible();
    $(".button-collapse").sideNav();
    $('select').material_select();
    $('#zoomWheel').prop('checked', true);
    $('#showAxis').prop('checked', true);
    $('#orbitControlsEnabled').prop('checked', true);
    $("#sketch-container").on('contextmenu', function (e) {
        e.preventDefault();
    }, false);
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

function Controls(navbarRef) {
    createElements(navbarRef);
    this.axeAngleX;
    this.axeAngleY;
    this.axeAngleZ;

    this.lastRotation = {x: 0, y: 0, z: 0};
    this.lastPos = {x: 0, y: 0, z: 0};

    this.currentPos = {x: 0, y: 0, z: 0};

    this.lightColor;
    this.materialColor;
    this.dirX;
    this.dirY;
    this.dirZ;

    this.orbitControIsEnabled = false;
    this.zoomWheelEnabled = true;
    this.showAxis = true;

    this.spacing = 10;
    this.axisMagnitude = 100;

    this.drawAxis = function () {
        this.drawXAxis();
        this.drawYAxis();
        this.drawZAxis();
    };
    this.drawXAxis = function () {
        push();
        translate(this.axisMagnitude / 2, 0, 0);
        specularMaterial(255, 0, 0);
        box(this.axisMagnitude, 3, 3);
        pop();
    };
    this.drawYAxis = function () {
        push();
        translate(0, -this.axisMagnitude / 2, 0);
        specularMaterial(0, 255, 0);
        box(3, this.axisMagnitude, 3);
        pop();
    };
    this.drawZAxis = function () {
        push();
        translate(0, 0, this.axisMagnitude / 2);
        specularMaterial(0, 0, 255);
        box(3, 3, this.axisMagnitude);
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
        if (this.zoomWheelEnabled) {
            this.applyZoom();
        }
        try {
            if (this.orbitControIsEnabled) {
                this.mouseControls();
            }
            camera(this.currentPos.x, this.currentPos.y, this.currentPos.z);
            rotateY(radians(this.axeAngleY));
            rotateX(radians(this.axeAngleX));
            rotateZ(radians(this.axeAngleZ));
        }
        catch (e) {
            console.log(e);
            rotate(this.axeAngleX);
            enabled3D = false;
        }
        if (!enabled3D) {
            return;
        }
        if (this.showAxis) {
            this.drawAxis();
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
        this.axeAngleX = parseFloat(document.getElementById('axeAngleX').value);
        this.axeAngleY = parseFloat(document.getElementById('axeAngleY').value);
        this.axeAngleZ = parseFloat(document.getElementById('axeAngleZ').value);

        this.currentPos.x = parseFloat(document.getElementById('cameraX').value);
        this.currentPos.y = parseFloat(document.getElementById('cameraY').value);
        this.currentPos.z = parseFloat(document.getElementById('cameraZ').value);

        this.orbitControIsEnabled = document.getElementById("orbitControlsEnabled").checked;
        this.zoomWheelEnabled = document.getElementById("zoomWheel").checked;
        this.showAxis = document.getElementById("showAxis").checked;

    };

    this.applyZoom = function () {
        this.currentPos.z = zoom;
        camera(this.currentPos.x, this.currentPos.y, this.currentPos.z);
        $('#cameraZ').val(this.currentPos.z);
    };

    this.mouseControls = function () {
        if (isMousePressed) {
            if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
                //console.log("miss click");
                return;
            }
            if (mouseButton === LEFT) {
                if (isDragging) {
                    this.axeAngleY = this.lastRotation.y + 180 * (mouseX - this.lastPos.x) / (width);
                    this.axeAngleY = this.axeAngleY % 360;
                    this.axeAngleX = this.lastRotation.x + 180 * (mouseY - this.lastPos.y) / (height);
                    this.axeAngleX = this.axeAngleX % 360;
                } else {
                    this.lastPos.x = mouseX;
                    this.lastPos.y = mouseY;
                    this.lastRotation.x = this.axeAngleX;
                    this.lastRotation.y = this.axeAngleY;
                    console.log(this.lastPos);
                }
                isDragging = true;
                $('#axeAngleX').val(this.axeAngleX);
                $('#axeAngleY').val(this.axeAngleY);
            }
            if (mouseButton === RIGHT) {
                if (this.currentPos.x === "") {
                    this.currentPos.x = 0;
                }
                if (this.currentPos.y === "") {
                    this.currentPos.y = 0;
                }
                if (isDragging) {
                    this.currentPos.x = (mouseX - this.lastPos.x);
                    this.currentPos.y = (mouseY - this.lastPos.y);
                }
                else {
                    this.lastPos.x = mouseX;
                    this.lastPos.y = mouseY;
                    this.lastRotation.x = this.axeAngleX;
                    this.lastRotation.y = this.axeAngleY;
                    console.log(this.lastPos);
                }
                isDragging = true;
                $('#cameraX').val(this.currentPos.x);
                $('#cameraY').val(this.currentPos.y);
            }
        } else {
            isDragging = false;
        }
    };
}

function mouseWheel(event) {
    //print(event.delta);
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