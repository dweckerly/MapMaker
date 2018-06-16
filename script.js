var heightOffset = 50;
var widthOffset = 30;

var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

var points = [];
var currentPoint = -1;

var dragging = false;

$(document).ready(function () {
    setCanvasSize();
});

$(window).resize(function () {
    setCanvasSize();
});

$('#mainCanvas').mousedown(function () {
    if(points.length > 0) {
        if(onPoint(points[currentPoint])) {
            dragging = true;
        }
    }
});

$('#mainCanvas').mouseleave(function () {
    if(dragging) {
        dragging = false;
    }
});

$('#mainCanvas').mouseup(function () {
    if(dragging) {
        dragging = false;
    }
});

$('#createSelector').change(function () {
    if($('#createSelector').val() == 'newPoint') {
        addPoint();
        currentPoint++;
        $('#pointSelector').append("<option>" + points[currentPoint].name + "</option>");
        $('#pointSelector').val(points[currentPoint].name);
        $('#createSelector').val("");
    }
});

function setCanvasSize() {
    canvas.width =  $(window).width() - widthOffset;
    canvas.height = $(window).height() - heightOffset;
}

function addPoint(x = (canvas.width / 2), y = (canvas.height / 2)) {
    var point = new Point(x, y, 20, 20)
    ctx.fillRect(point.x, point.y, point.w, point.h);
    points.push(point);
}

function removePoint() {
    ctx.clearRect(points[currentPoint].x, points[currentPoint].y, points[currentPoint].w, points[currentPoint].h);
    points.pop();
}

function addLine() {

}

onmousemove = function(evt) {
    var rect = canvas.getBoundingClientRect();
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;

    if(dragging) {
        removePoint();
        addPoint(mouseX, mouseY);
    }
}

function onPoint(rect) {
    if(
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

