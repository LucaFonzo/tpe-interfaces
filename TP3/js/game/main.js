import Board from './Board.js';
import Player from './Player.js';
import Tile from './Tile.js';
import Game from './Game.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

//let game = new Game(ctx);

let tile = new Tile(width/2, height/2, null);
tile.draw(ctx);