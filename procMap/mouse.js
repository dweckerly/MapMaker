c.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(c, evt);
    if (dragging) {
        cOffset.x += mousePos.x - mouseOffset.x;
        cOffset.y += mousePos.y - mouseOffset.y;
        mouseOffset.x = mousePos.x;
        mouseOffset.y = mousePos.y;
        draw();
    }
    for (let i = 0; i < points.length; i++) {
        if (mousePos.x >= points[i].x && mousePos.x <= (points[i].x + points[i].w)) {
            if (mousePos.y >= points[i].y && mousePos.y <= (points[i].y + points[i].h)) {
                points[i].w = wildImgWidth * 3;
                points[i].h = wildImgHeight * 3;
            } else {

            }
        }
    }
}, false);

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