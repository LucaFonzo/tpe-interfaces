import Circle from './Circle.js';
import Layer from './Layer.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = 1200;
const height = 800;

canvas.width = width;
canvas.height = height;

//------------------------------------

const layer = new Layer(ctx);

layer.addCircle(new Circle(100, 100, 50, 'red', ctx));
layer.addCircle(new Circle(200, 200, 50, 'green', ctx));
layer.draw();

canvas.addEventListener('click', layer.changeColor.bind(layer));
canvas.addEventListener('mousemove', layer.drag.bind(layer));