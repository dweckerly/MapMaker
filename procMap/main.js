var mainInterval;

var points;
var pointCount = 12;
var pointDist = 120;
var pointDistFactor = 48;
var pointDim = 25;

var pathCount = 2;

var direction;

var startingPoint = { x: 0, y: 0 };

const types = ["start", "end", "wild", "shop", "rest"]

var node = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    type: "",
    img: "",
    paths: []
}

$('#incPoints').val(pointCount);
$('#changeDim').val(pointDim);

function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function clearOffset() {
    cOffset = { x: 0, y: 0 };
    mouseOffset = { x: 0, y: 0 };
}

function draw() {
    clearCanvas();
    drawPoints();
    drawLines();
}

function setDirection() {
    let r = Math.floor(Math.random() * 4);
    switch (r) {
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
}

function createPoints() {
    clearOffset();
    points = [];
    setDirection();
    pointCount = $('#incPoints').val();
    for (let i = 0; i < pointCount; i++) {
        let rx = Math.round(Math.random() * pointDistFactor * 2) - pointDistFactor;
        let ry = Math.round(Math.random() * pointDistFactor * 2) - pointDistFactor;
        switch (direction) {
            case "east":
                points.push(new Node(startingPoint.x + pointDist * i + rx, startingPoint.y + ry, wildImgWidth, wildImgHeight, types[2], wildImg, [], false));
                break;
            case "south":
                points.push(new Node(startingPoint.x + rx, startingPoint.y + pointDist * i + ry, wildImgWidth, wildImgHeight, types[2], wildImg, [], false));
                break;
            case "west":
                points.push(new Node(startingPoint.x - pointDist * i + rx, startingPoint.y + ry, wildImgWidth, wildImgHeight, types[2], wildImg, [], false));
                break;
            case "north":
                points.push(new Node(startingPoint.x + rx, startingPoint.y - pointDist * i + ry, wildImgWidth, wildImgHeight, types[2], wildImg, [], false));
                break;
        }
    }
}

function drawPoints() {
    for (let i = 0; i < points.length; i++) {
        if (i == 0 || i == points.length - 1) {
            ctx.fillRect(points[i].x - (pointDim / 2) + cOffset.x, points[i].y - (pointDim / 2) + cOffset.y, pointDim * 2, pointDim * 2);
        } else {
            if(points[i].hover) {
                ctx.drawImage(points[i].img, points[i].x - (points[i].w) + cOffset.x, points[i].y - (points[i].h) + cOffset.y, wildImgWidth * 2, wildImgHeight * 2);
            } else {
                ctx.drawImage(points[i].img, points[i].x - (points[i].w / 2) + cOffset.x, points[i].y - (points[i].h / 2) + cOffset.y);
            }
        }
    }
}

function drawLines() {
    for (let i = 0; i < points.length - 1; i++) {
        line(points[i], points[i + 1]);
    }
}

function line(start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x + cOffset.x, start.y + cOffset.y);
    ctx.lineTo(end.x + cOffset.x, end.y + cOffset.y);
    ctx.stroke();
}

function distance(start, end) {
    return (Math.sqrt(Math.pow(((start.x - start.y) + (end.x - end.y)), 2)));
}

function logDistanceBetweenPoints() {
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i != j) {
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