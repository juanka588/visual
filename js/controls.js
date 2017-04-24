var docReady = false;
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

    this.cameraX;
    this.cameraY;
    this.cameraZ;

    this.lightColor;
    this.materialColor;
    this.dirX;
    this.dirY;
    this.dirZ;

    this.setCustom = function (html) {
        $.get(html, function (data) {
//        console.log(data);
            $(".custom-controls").html(data);
        });
    };

    this.controle = function () {
        if (!docReady) {
            return;
        }
        var enabled3D = true;
        this.axeAngleX = (document.getElementById('axeAngleX').value / 180) * PI;
        this.axeAngleY = (document.getElementById('axeAngleY').value / 180) * PI;
        this.axeAngleZ = (document.getElementById('axeAngleZ').value / 180) * PI;

        this.cameraX = (document.getElementById('cameraX').value / 180) * PI;
        this.cameraY = (document.getElementById('cameraY').value / 180) * PI;
        this.cameraZ = (document.getElementById('cameraZ').value / 180) * PI;
        try {
            camera(this.cameraX, this.cameraY, this.cameraZ);
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