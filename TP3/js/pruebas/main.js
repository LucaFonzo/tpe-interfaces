import Circle from './Circle.js';
import Layer from './Layer.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = 1200;
const height = 800;

canvas.width = width;
canvas.height = height;

//------------------------------------

const layer = new Layer();
canvas.addEventListener('click', layer.check.bind(layer));

layer.addCircle(new Circle(100, 100, 50, 'red', ctx));
layer.addCircle(new Circle(200, 200, 50, 'green', ctx));
layer.draw();
