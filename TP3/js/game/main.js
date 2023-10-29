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
const tileSize = 30;
//let game = new Game(ctx);

let disk = new Disk(50, 50, tileSize/3, "green");

let board = new Board(width/2-3.5*tileSize, height/2-3*tileSize, tileSize, 6, 7);
board.draw(ctx);

const btn = async (e) => {
    e.target.removeEventListener('click', btn);
    await board.animateFall(ctx, disk, tileSize/8, 3);
    e.target.addEventListener('click', btn);
}

document.querySelector('button').addEventListener('click', btn);
