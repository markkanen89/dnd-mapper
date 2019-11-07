var map = $("#map-image")

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
    map.attr('src', e.target.result);
    setMapSize()
    rebuildGrid()
};

function ToggleSettings() {
    $(".settings").toggle()
};

var angle = 0;
function RotateImage(rot) {
    var image = document.getElementById('map-image')
    if (rot == 'l') {
        angle -= 90;
    } else if (rot == 'r') {
        angle += 90;
    }
    image.style.transform = 'rotate(' + angle + 'deg)';
    $('#grid-container').css("transform", 'rotate(' + angle + 'deg)')
};

function setMapSize() {
    var
        width = parseInt($("#mapWidth").val())
        height = parseInt($("#mapHeight").val())
        fit = $("#mapFit")[0].checked

    if (fit) {
        map.css("max-width", "100vw")
        map.css("max-height", "100vh")
    } else {
        map.css("max-width", width)
        map.css("max-height", height)
    }
    rebuildGrid()
}

/* Grid Creation */
function makeGrid() {
    var
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
        hextileBBox = $("#grid-container .hextile")[0].getBBox(),
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

function openPage(){
    var win = window.open('', '_blank', 'toolbar=0,location=0,menubar=0');
    if (win) {
        win.document.write(document.documentElement.innerHTML);
    }

}

var rebuildGrid = function () {
    makeGrid();
    setGridOffset();
    setTileProperties();
};
