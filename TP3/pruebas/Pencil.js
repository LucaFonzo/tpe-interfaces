class Pencil {
    constructor(color, ctx) {
        this.color = color;
        this.ctx = ctx;
        this.active = false;
        this.eraser = false;
        this.width = 5;
    }

    paint(e) {
        if (!this.active) return;
        const x = e.offsetX;
        const y = e.offsetY;
        if (this.eraser) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, 25, 0, 2 * Math.PI);
            this.ctx.fillStyle = '#E1E1E1';
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.fillStyle = this.color;
            return;
        }
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.width;
        this.ctx.moveTo(x + 5, y + 5);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    activate() {
        this.active = true;
        this.ctx.beginPath();
    }

    deactivate() {
        this.active = false;
    }

    toggleEraser() {
        this.eraser = !this.eraser;
    }

    setColor(color){
        this.color = color;
    }

    setWidth(width){
        this.width = width;
    }
}

export default Pencil;