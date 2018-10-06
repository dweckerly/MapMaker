var mainInterval;

var points;
var pointCount = 10;
var pointDist = 50;
var pointDistFactor = 18;
var pointDim = 5;

var direction;

var startingPoint = {x: 0, y: 0};

$('#incPoints').val(pointCount);
$('#changeDim').val(pointDim);

function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function clearOffset() {
    cOffset = {x: 0, y: 0};
    mouseOffset = {x: 0, y: 0};
}

function draw() {
    clearCanvas();
    drawPoints();
    drawLines();
}

function setDirection() {
    let r = Math.floor(Math.random() * 4);
    console.log(r);
    switch(r) {
        case 0:
            direction = "east";
            startingPoint.x = pointDim;
            startingPoint.y = (c.height / 2) - (pointDim / 2);
            break;
        case 1:
            direction = "south";
            startingPoint.x = (c.width / 2) - (pointDim / 2);
            startingPoint.y = pointDim;
            break;
        case 2:
            direction = "west";
            startingPoint.x = c.width - pointDim * 2;
            startingPoint.y = (c.height / 2) - (pointDim / 2);
            break;
        case 3:
            direction = "north";
            startingPoint.x = (c.width / 2) - (pointDim / 2);
            startingPoint.y = c.height - pointDim;
            break;
    }
    console.log(direction);
}

function createPoints() {
    clearOffset();
    points = [];
    setDirection();
    for(let i = 0; i < pointCount; i++) {
        let rx = Math.round(Math.random() * pointDistFactor * 2) - pointDistFactor;
        let ry = Math.round(Math.random() * pointDistFactor * 2) - pointDistFactor;
        switch (direction) {
            case "east":
                points.push({x: startingPoint.x + pointDist * i + rx, y: startingPoint.y + ry});
                break;
            case "south":
                points.push({x: startingPoint.x + rx, y: startingPoint.y + pointDist * i + ry});
                break;
            case "west":
                points.push({x: startingPoint.x - pointDist * i + rx, y: startingPoint.y + ry});
                break;
            case "north":
                points.push({x: startingPoint.x + rx, y: startingPoint.y - pointDist * i + ry});
                break;
        }
        
    }
}

function drawPoints() {
    for(let i = 0; i < points.length; i++) {
        if(i == 0 || i == points.length - 1) {
            ctx.fillRect(points[i].x - (pointDim / 2) + cOffset.x, points[i].y - (pointDim / 2) + cOffset.y, pointDim * 2, pointDim * 2);
        } else {
            ctx.fillRect(points[i].x - (pointDim / 2) + cOffset.x, points[i].y - (pointDim / 2) + cOffset.y, pointDim, pointDim);
        }
   
    }
}

function drawLines() {
    for(let i = 0; i < points.length - 1; i++) {
        line(points[i], points[i + 1]);
    }
}

function line(start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x + cOffset.x, start.y + + cOffset.y);
    ctx.lineTo(end.x + cOffset.x, end.y + + cOffset.y);
    ctx.stroke();
}

function distance(start, end) {
    return (Math.sqrt(Math.pow(((start.x - start.y) + (end.x - end.y)), 2)));
}

function logDistanceBetweenPoints() {
    for(let i = 0; i < points.length; i++) {
        for(let j = 0; j < points.length; j++) {
            if(i != j) {
                console.log(distance(points[i], points[j]));
            }
        }
    }
}

$('#reCreate').click(() => {
    createPoints();
});

$('#incPoints').on("change", () => {
    pointCount = $('#incPoints').val();
    createPoints();
});

$('#changeDim').on("change", () => {
    pointDim = $('#changeDim').val();
    draw();
})

createPoints();
mainInterval = setInterval(() => {
    draw();
}, 30);