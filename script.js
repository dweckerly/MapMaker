var heightOffset = 50;
var widthOffset = 30;

var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

var currentPoint = -1;
var currentLine = -1;
var selectedPoint;
var selectedLine = 0;

var points = [];
var lines = [];


var dragging = false;

$(document).ready(function() {
    setCanvasSize();
    $('#lineBtn').prop("disabled", true);
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

$('#pointBtn').click(function() {
    addPoint();
    currentPoint++;
    addLine();
    $('#pointSelector').append("<option value='" + currentPoint + "'>" + points[currentPoint].name + "</option>");
    $('#pointSelector').val(currentPoint);
    if (points.length > 2) {
        $('#lineBtn').prop("disabled", false);
    }
});

$('#pointSelector').change(function() {
    var selection = $('#pointSelector').val();
    highlightPoint(points[selection]);
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
        drawLine(line);
    }
}

function drawLine(line) {
    ctx.beginPath();
    ctx.moveTo(line.startX, line.startY);
    ctx.lineTo(line.endX, line.endY);
    ctx.stroke();
}

function redaw() {
    for (var i = 0; i < points.length; i++) {
        ctx.fillRect(points[i].x, points[i].y, points[i].w, points[i].h);
        if (lines[i]) {
            drawLine(lines[i]);
        }
        if (selectedPoint) {
            highlightPoint(selectedPoint);
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