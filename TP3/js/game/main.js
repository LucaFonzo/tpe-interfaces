import Board from './Board.js';
import Player from './Player.js';
import Disk from './Disk.js';
import Tile from './Tile.js';
import Game from './Game.js';

const canvas = document.querySelector('canvas');
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const slider = document.querySelector('input[type=range]');
let tileSize;
let board;
let disk;

const put = async (e) => {
    e.target.removeEventListener('click', put);
    await board.animateFall(ctx, disk, tileSize/8, 3);
    e.target.addEventListener('click', put);
}

const start = () => {
    ctx.clearRect(0, 0, width, height);
    tileSize = parseInt(slider.value);
    disk = new Disk(50, 50, tileSize / 3, "green");
    board = new Board(width / 2 - 3.5 * tileSize, height / 2 - 3 * tileSize, tileSize, 6, 7);
    board.draw(ctx);
    document.querySelector('#put').addEventListener('click', put);
    document.querySelector('#put').disabled = false;
}


document.querySelector('#start').addEventListener('click', start);