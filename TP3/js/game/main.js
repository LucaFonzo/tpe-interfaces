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

let disk = new Disk(50, 50, 10, "red");

let tiles = [];

for (let i = 0; i < 6; i++) {
    tiles.push(new Tile(300, 150 + i*60, 60, null));
}

for(let tile of tiles){
    tile.draw(ctx);
}

document.querySelector('button').addEventListener('click', async () => {
    for(let tile of tiles){
        await tile.animateFall(ctx, disk, 5);
    }
});
