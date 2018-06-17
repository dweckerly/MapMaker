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
        this.startPoint = p1;
        this.startPointIndex;
        this.endPoint = p2;
        this.endPointIndex;
        this.startX = p1.x + (p1.w / 2);
        this.startY = p1.y + (p1.h / 2);
        this.endX = p2.x + (p2.w / 2);
        this.endY = p2.y + (p2.h / 2);
    }
}