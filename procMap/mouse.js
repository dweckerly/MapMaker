c.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(c, evt);
    if (dragging) {
        cOffset.x += mousePos.x - mouseOffset.x;
        cOffset.y += mousePos.y - mouseOffset.y;
        mouseOffset.x = mousePos.x;
        mouseOffset.y = mousePos.y;
        draw();
    } else {
        checkForHover();
    }
}, false);

function checkForHover() {
    for (let i = 0; i < points.length; i++) {
        if (mousePos.x >= (points[i].x + cOffset.x - points[i].w) && mousePos.x <= (points[i].x + cOffset.x + points[i].w)) {
            if (mousePos.y >= (points[i].y + cOffset.y - points[i].h) && mousePos.y <= (points[i].y + cOffset.y + points[i].h)) {
                points[i].hover = true;
                console.log("hovering");
            } else {
                points[i].hover = false;
            }
        }
    }
}

function getMousePos(c, evt) {
    var rect = c.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

$('#canvas').mousedown(function(evt) {
    mousePos = getMousePos(c, evt);
    mouseOffset.x = mousePos.x;
    mouseOffset.y = mousePos.y;
    dragging = true;
});

$('#canvas').mouseleave(function() {
    if (dragging) {
        dragging = false;
    }
});

$('#canvas').mouseup(function() {
    if (dragging) {
        dragging = false;
    }
});