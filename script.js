var heightOffset = 50;
var widthOffset = 30;

var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

var currentPoint = -1;
var currentLine = -1;
var points = [];
var lines = [];


var dragging = false;

$(document).ready(function() {
    setCanvasSize();
});

$(window).resize(function() {
    setCanvasSize();
});

$('#mainCanvas').mousedown(function() {
    if (points.length > 0) {
        if (onPoint(points[currentPoint])) {
            dragging = true;
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

$('#createSelector').change(function() {
    if ($('#createSelector').val() == 'newPoint') {
        addPoint();
        currentPoint++;
        addLine();
        $('#pointSelector').append("<option>" + points[currentPoint].name + "</option>");
        $('#pointSelector').val(points[currentPoint].name);
        $('#createSelector').val("");
    }
});

function setCanvasSize() {
    canvas.width = $(window).width() - widthOffset;
    canvas.height = $(window).height() - heightOffset;
}

function clearCanvas() {
    points.pop();
    lines.pop();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addPoint(x = (canvas.width / 2), y = (canvas.height / 2)) {
    var point = new Point(x, y, 20, 20)
    ctx.fillRect(point.x, point.y, point.w, point.h);
    points.push(point);
}

function addLine(p1 = points[currentPoint - 1], p2 = points[currentPoint]) {
    if (points.length > 1) {
        var line = new Line(p1, p2);
        lines.push(line);
    }
}

function redaw() {
    for (var i = 0; i < points.length; i++) {
        ctx.fillRect(points[i].x, points[i].y, points[i].w, points[i].h);
        if (i > 0) {
            ctx.beginPath();
            ctx.moveTo(points[i - 1].x, points[i - 1].y);
            ctx.lineTo(points[i].x, points[i].y);
            ctx.stroke();
        }
    }
}

onmousemove = function(evt) {
    var rect = canvas.getBoundingClientRect();
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;

    if (dragging) {
        clearCanvas();
        redaw();
        addPoint(mouseX, mouseY);
        addLine();
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