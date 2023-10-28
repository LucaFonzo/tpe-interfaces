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

//let game = new Game(ctx);

let disk = new Disk(50, 50, 25, "red");

let board = new Board(6, 7);
board.draw(ctx);

document.querySelector('button').addEventListener('click', async () => {
    await board.animateFall(ctx, disk, 10, 3);
});
