class Layer {
    constructor(context) {
        this.ctx = context;
        this.circles = [];
    }

    addCircle(circle) {
        this.circles.push(circle);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    draw() {
        this.circles.forEach(circle => circle.draw());
    }

    changeColor(e) {
        let circle = this.identify(e);
        if (circle) {
            if (circle.color == 'green') {
                circle.color = 'red';
            }
            else {
                circle.color = 'green';
            }

            this.draw();
        }
    }

    drag(e) {
        if (e.ctrlKey) {
            let circle = this.identify(e);
            if (circle) {
                circle.move(e.movementX, e.movementY)
                this.clearCanvas();
                this.draw();
            }
        }
    }

    identify(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        for (let c of this.circles) {
            const dx = c.x - x;
            const dy = c.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= c.radius) {
                return c;
            }
        }
    }
}

export default Layer;