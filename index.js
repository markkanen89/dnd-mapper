$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded(e) {
    $('#map-image').attr('src', e.target.result);
};

function ToggleSettings() {
    $(".settings").toggle()
};

var angle = 0;
function RotateImage(rot) {
    var image = document.getElementById('map-image')
    if (rot == 'l') {
        angle += 90;
    } else if (rot == 'r') {
        angle -= 90;
    }
    image.style.transform = 'rotate(' + angle + 'deg)';
};

/* Grid Creation */
function makeGrid() {
    var
        map = $("#map-image"),
        radius = parseInt($('#tilesize').val()) / 2,
        columns = 2 + Math.ceil(map.width() / radius),
        rows = 2 + Math.ceil(map.height() / (1.6 * radius)),
        cssClass = 'hextile';

    $('#grid-container').empty().hexGridWidget(radius, columns, rows, cssClass);
    $('#grid-container').css("width", map.width())
    $('#grid-container').css("height", map.height())
};

function setGridOffset() {
    var
        offsetY = parseInt($('#offsetY').val()),
        offsetX = parseInt($('#offsetX').val()),
        hextileBBox = document.getElementsByClassName("hextile")[0].getBBox(),
        defaultOffsetX = hextileBBox.width * 2,
        defaultOffsetY = hextileBBox.height * 2;

    $('#grid-container svg').css("left", offsetX - defaultOffsetX)
    $('#grid-container svg').css("top", offsetY - defaultOffsetY)
};

function setTileProperties() {
    var
        red = parseInt($("#r").val()),
        green = parseInt($("#g").val()),
        blue = parseInt($("#b").val()),
        alpha = parseFloat($("#a").val()),
        strokeWidth = $("#strokeWidth").val();

    $(".hextile").css("stroke", `rgba(${red}, ${green}, ${blue}, ${alpha}`);
    $(".hextile").css("stroke-width", strokeWidth + "px");
};

var rebuildGrid = function () {
    makeGrid();
    setGridOffset();
    setTileProperties();
};
