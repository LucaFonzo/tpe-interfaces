import Game from './Game.js';

const canvas = document.querySelector('canvas');
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

let config;
let game;

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

const start = () => {
    setConfig();
    game = new Game(ctx, config);
    game.initGame();
}

document.querySelector('#start').addEventListener('click', start);