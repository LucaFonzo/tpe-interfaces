import Circle from './Circle.js';
import Layer from './Layer.js';

const canvas1 = document.querySelector('#c1');
/**@type {CanvasRenderingContext2D} */
const ctx1 = canvas1.getContext('2d');
const width = 1200;
const height = 800;

canvas1.width = width;
canvas1.height = height;

//------------------------------------

const layer = new Layer(ctx1);

layer.addCircle(new Circle(100, 100, 50, 'red', ctx1));
layer.addCircle(new Circle(200, 200, 50, 'green', ctx1));
layer.draw();

canvas1.addEventListener('click', layer.changeColor.bind(layer));
canvas1.addEventListener('mousemove', layer.drag.bind(layer));

//------------------------------------
const canvas2 = document.querySelector('#c2');
/**@type {CanvasRenderingContext2D} */
const ctx2 = canvas2.getContext('2d');
canvas2.width = width;
canvas2.height = height;

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
            this.ctx.arc(x, y, 30, 0, 2 * Math.PI);
            this.ctx.fillStyle = '#E1E1E1';
            this.ctx.fill();
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

const pencil = new Pencil('black', ctx2);

document.addEventListener('DOMContentLoaded', e => {
    canvas2.addEventListener('mousedown', e => {
        pencil.activate();
        pencil.paint(e);
    });

    canvas2.addEventListener('mousemove', e => {
        pencil.paint(e);
    });

    canvas2.addEventListener('mouseup', e => {
        pencil.deactivate();
    });

    document.querySelector('#eraser').addEventListener('click', e => {
        document.querySelector('#eraser').classList.toggle('active');
        canvas2.classList.toggle('active');
        pencil.toggleEraser();
    });

    document.querySelector('#color').addEventListener('change', e => {
        pencil.setColor(e.target.value);
    });
});
