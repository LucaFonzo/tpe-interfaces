import Board from './Board.js';
import Player from './Player.js';
import Disk from './Disk.js';
import Tile from './Tile.js';
import Game from './Game.js';

const canvas = document.querySelector('canvas');
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

let config;
let game;
let disk1;
let disk2;

const slider = document.querySelector('input[type=range]');
const p1Name = document.querySelector('#player1-name');
const p2Name = document.querySelector('#player2-name');
const p1Color = document.querySelector('#player1-color');
const p2Color = document.querySelector('#player2-color');

const setConfig = (e) => {
    let radio = document.querySelector('input[type=radio]:checked');
    config = {
        width: parseInt(canvas.width),
        height: parseInt(canvas.height),
        tileSize: parseInt(slider.value),
        rows: parseInt(radio.value.slice(0, 1)),
        cols: parseInt(radio.value.slice(-1)),
        players: [
            {
                name: p1Name.value,
                color: p1Color.value,
                character: "T",
                img: "../../assets/img/profile-pictures/aristoteles.png"	
            },
            {
                name: p2Name.value,
                color: p2Color.value,
                character: "J",
                img: "../../assets/img/profile-pictures/messi.png"
            }
        ],
        totalDisks: 10
    };
}; 

const put = async (e) => {
    e.target.removeEventListener('click', put);
    e.target.disabled = true;
    let disk = game.isTurnOfPlayerOne() ? disk1 : disk2;
    let putInColumn = Math.floor((Math.random() * config.cols));
    await game.getBoard().animateFall(ctx, disk, config.tileSize/8, putInColumn);
    e.target.addEventListener('click', put);
    e.target.disabled = false;
    game.switchTurns();
}

const start = () => {
    setConfig();
    disk1 = new Disk(50, 50, config.tileSize / 3, config.players[0].color);
    disk2 = new Disk(50, 50, config.tileSize / 3, config.players[1].color);
    game = new Game(ctx, config);
    game.initGame();
    document.querySelector('#put').addEventListener('click', put);
    document.querySelector('#put').disabled = false;
}


document.querySelector('#start').addEventListener('click', start);