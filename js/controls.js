$(document).ready(function () {
    $('.collapsible').collapsible();
    $('select').material_select();
    $('.modal').modal(
            {complete: function () {
                    var id = $(this)[0].id;
                    console.log("done for id: " + id);
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
});
/**
 * 
 * @type Number 0 ambient, 1 point, 2 directional
 */
var lightToApply = 0;
/**
 * 
 * @type Number 0 normalMaterial 1 specularMaterial 2 ambientMaterial 
 */
var materialType = 0;

function Controls() {
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

    this.controle = function () {
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
        }

        this.lightColor = document.getElementById('light-color').value;
        this.materialColor = document.getElementById('material-color').value;
        switch (lightToApply) {
            case 0:
                ambientLight(this.lightColor);
                break;
            case 1:
                this.dirX = document.getElementById('pointLightX').value;
                this.dirY = document.getElementById('pointLightY').value;
                this.dirZ = document.getElementById('pointLightZ').value;
                pointLight(this.lightColor, this.dirX, this.dirY, this.dirZ);
                break;
            case 2:
                this.dirX = document.getElementById('dirLightX').value;
                this.dirY = document.getElementById('dirLightY').value;
                this.dirZ = document.getElementById('dirLightZ').value;
                directionalLight(this.lightColor, this.dirX, this.dirY, this.dirZ);
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

