class Circle {
    constructor(x, y, radius, color, context) {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.color = color;
        this.context = context;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = this.color;
        this.context.fill();
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export default Circle;