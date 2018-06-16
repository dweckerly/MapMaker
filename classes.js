class Point {
    constructor(x, y, h, w) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.name = 'point-' + points.length;
    }
}

class Line {
    constructor(p1, p2) {
        this.startX = p1.x;
        this.startY = p1.y;
        this.endX = p2.x;
        this.endY = p2.y;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
}