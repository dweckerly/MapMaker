var heightOffset = 50;
var widthOffset = 30;

var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

var currentPoint = -1;
var currentLine = -1;
var selectedPoint;
var selectedLine;

var points = [];
var lines = [];


var dragging = false;

$(document).ready(function() {
    setCanvasSize();
    $('#createLineBtn').prop("disabled", true);
    $('#removeLineBtn').prop("disabled", true);
});

$(window).resize(function() {
    setCanvasSize();
});

$('#mainCanvas').mousedown(function() {
    if (points.length > 0) {
        for (var i = 0; i < points.length; i++) {
            if (onPoint(points[i])) {
                console.log("Dragging: " + i);
                selectedPoint = i;
                dragging = true;
            }
        }
    }
});

$('#mainCanvas').mouseleave(function() {
    if (dragging) {
        dragging = false;
    }
});

$('#mainCanvas').mouseup(function() {
    if (dragging) {
        dragging = false;
    }
});

onmousemove = function(evt) {
    var rect = canvas.getBoundingClientRect();
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;

    // need to rework this
    if (dragging) {
        clearCanvas();
        redaw(mouseX, mouseY);
    }
}

function onPoint(rect) {
    if (
        mouseX <= rect.x + rect.w &&
        mouseX >= rect.x &&
        mouseY <= rect.y + rect.h &&
        mouseY >= rect.y
    ) {
        return true;
    } else {
        return false;
    }
}

$('#createPointBtn').click(function() {
    addPoint();
    currentPoint++;
    $('#pointSelector').append("<option value='" + currentPoint + "'>" + points[currentPoint].name + "</option>");
    $('#fromPointSelector').append("<option value='" + currentPoint + "'>" + points[currentPoint].name + "</option>");
    $('#toPointSelector').append("<option value='" + currentPoint + "'>" + points[currentPoint].name + "</option>");
    $('#toPointSelector').val(currentPoint);
    if (points.length > 1) {
        $('#removeLineBtn').prop("disabled", false);
        $('#createLineBtn').prop("disabled", false);
    }
});

$('#removePointBtn').click(function() {

});

$('#createLineBtn').click(function() {
    var fromPoint = points[$('#fromPointSelector').val()];
    var toPoint = points[$('#toPointSelector').val()];
    addLine(fromPoint, toPoint);
});

function setCanvasSize() {
    canvas.width = $(window).width() - widthOffset;
    canvas.height = $(window).height() - heightOffset;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addPoint(x = (canvas.width / 2), y = (canvas.height / 2)) {
    var point = new Point(x, y, 20, 20)
    points.push(point);
    drawPoint(point);
}

function addLine(p1 = points[currentPoint - 1], p2 = points[currentPoint]) {
    if (points.length > 1) {
        var line = new Line(p1, p2);
        lines.push(line);
        drawLine(line);
    }
}

function drawPoint(point) {
    ctx.fillRect(point.x, point.y, point.w, point.h);
    ctx.font = "16px Arial";
    ctx.fillText(point.name, point.x, point.y - 16);
}

function drawLine(line) {
    ctx.beginPath();
    ctx.moveTo(line.startX, line.startY);
    ctx.lineTo(line.endX, line.endY);
    ctx.stroke();
}

function redaw(x, y) {
    for (var i = 0; i < points.length; i++) {
        if (i == selectedPoint) {
            points[i].x = x;
            points[i].y = y;
        }
        drawPoint(points[i]);
        //ctx.fillRect(points[i].x, points[i].y, points[i].w, points[i].h);
        if (lines[i]) {
            drawLine(lines[i]);
        }
    }
}




// highlight functionality that may be used in a later implementation

/*
$('#pointSelector').change(function() {
    var selection = $('#pointSelector').val();
    highlightPoint(points[selection]);
});


function highlightPoint(p) {
    selectedPoint = p;
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "red";
    ctx.rect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);
    ctx.stroke();
    // reset to default
    ctx.strokeStyle = "black";
    ctx.lineWidth = "1";
}
*/