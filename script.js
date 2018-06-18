var heightOffset = 50;
var widthOffset = 30;

var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

var selectedPoint;

var points = [];
var lines = [];


var dragging = false;

$(document).ready(function() {
    setCanvasSize();
    $('#createLineBtn').prop("disabled", true);
    $('#removeLineBtn').prop("disabled", true);
});

$(window).resize(function() {
    selectedPoint = -1;
    setCanvasSize();
    redraw();
});

$('#mainCanvas').mousedown(function() {
    if (points.length > 0) {
        for (var i = 0; i < points.length; i++) {
            if (onPoint(points[i])) {
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

    if (dragging) {
        clearCanvas();
        redraw(mouseX, mouseY);
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
    if (points.length > 1) {
        $('#removeLineBtn').prop("disabled", false);
        $('#createLineBtn').prop("disabled", false);
    }
});

$('#removePointBtn').click(function() {
    for(var i = lines.length - 1; i > -1; i--) {
        if(lines[i]) {
            if(lines[i].startPoint == points[$('#pointSelector').val()] || lines[i].endPoint == points[$('#pointSelector').val()]) {
                removeLine(lines[i]);
            } else if(lines[i].startPoint == points[$('#pointSelector').val()] || lines[i].endPoint == points[$('#pointSelector').val()]) {
                removeLine(lines[i]);
            }
        }
    }
    removePoint(points[$('#pointSelector').val()]);
});

$('#removeLineBtn').click(function() {
    for(var i = lines.length - 1; i > -1; i--) {
        if(lines[i]) {
            if(lines[i].startPoint == points[$('#fromPointSelector').val()] && lines[i].endPoint == points[$('#toPointSelector').val()]){
                removeLine(lines[i]);
            } else if(lines[i].startPoint == points[$('#toPointSelector').val()] && lines[i].endPoint == points[$('#fromPointSelector').val()]) {
                removeLine(lines[i]);
            }
        }
    }
});

$('#createLineBtn').click(function() {
    var duplicate = false;
    var fromPoint = points[$('#fromPointSelector').val()];
    var toPoint = points[$('#toPointSelector').val()];
    if(fromPoint != toPoint) {
        for(var i = 0; i < lines.length; i++) {
            if(lines[i].startPoint == points[fromPoint] && lines[i].endPoint == points[toPoint]) {
                duplicate = true;
            }
        }
        if(!duplicate) {
            addLine(fromPoint, toPoint);
        }
    }
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
    $('#pointSelector').append("<option value='" + points.indexOf(point) + "'>" + points[points.indexOf(point)].name + "</option>");
    $('#fromPointSelector').append("<option value='" + points.indexOf(point) + "'>" + points[points.indexOf(point)].name + "</option>");
    $('#toPointSelector').append("<option value='" + points.indexOf(point) + "'>" + points[points.indexOf(point)].name + "</option>");
    $('#toPointSelector').val(points.indexOf(point));
    drawPoint(point);
}

function drawPoint(point) {
    ctx.fillRect(point.x, point.y, point.w, point.h);
    ctx.font = "16px Arial";
    ctx.fillText(point.name, point.x, point.y - 16);
}

function removePoint(point) {
    var idx = points.indexOf(point);
    if(idx > -1) {
        points.splice(idx, 1);
    }
    
    $("#pointSelector option").each(function(index, element) {
        if($(element).text() == point.name) {
            element.remove();
        }
    });

    $("#fromPointSelector option").each(function(index, element) {
        if($(element).text() == point.name) {
            element.remove();
        }
    });

    $("#toPointSelector option").each(function(index, element) {
        if($(element).text() == point.name) {
            element.remove();
        }
    });
    
    renamePoints();

    selectedPoint = -1;
    clearCanvas();
    redraw();
}

function renamePoints() {
    $("#pointSelector option").each(function(index, element) {
        $(element).val(index);
        points[index].name = "point-" + index;
        $(element).text(points[index].name);
    });

    $("#fromPointSelector option").each(function(index, element) {
        $(element).val(index);
        points[index].name = "point-" + index;
        $(element).text(points[index].name);
    });

    $("#toPointSelector option").each(function(index, element) {
        $(element).val(index);
        points[index].name = "point-" + index;
        $(element).text(points[index].name);
    });
}

// will need to create a method to rename the points...

function addLine(p1, p2) {
    if (points.length > 1) {
        var line = new Line(p1, p2);
        lines.push(line);
        drawLine(line);
    }
}

function removeLine(line) {
    var index = lines.indexOf(line);
    if(index > -1) {
        lines.splice(index, 1);
    }
    selectedPoint = -1;
    clearCanvas();
    redraw();
}

function removeLines(indices) {
    indices.sort(function(a, b) {return b-a});
    indices.forEach(function(index) {
        removeLine(lines[index])
    });
}

function drawLine(line) {
    ctx.beginPath();
    ctx.moveTo(line.startX, line.startY);
    ctx.lineTo(line.endX, line.endY);
    ctx.stroke();
}

function redraw(x = 0, y = 0) {
    var iterations;
    if(points.length >= lines.length) {
        iterations = points.length;
    } else {
        iterations = lines.length;
    }
    for (var i = 0; i < iterations; i++) {
        if (i == selectedPoint) {
            for(var j = 0; j < lines.length; j++) {
                if(lines[j].startPoint == points[i]) {
                    lines[j].startX = x + (points[i].w / 2);
                    lines[j].startY = y + (points[i].h / 2);
                }
                if(lines[j].endPoint == points[i]) {
                    lines[j].endX = x + (points[i].w / 2);
                    lines[j].endY = y + (points[i].h / 2);
                }
            }
            points[i].x = x;
            points[i].y = y;
        }
        if(points[i]) {
            drawPoint(points[i]);
        }
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