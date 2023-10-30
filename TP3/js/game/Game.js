import Player from './Player.js';
import Board from './Board.js';
import Disk from './Disk.js';
class Game {
    constructor(ctx, config) {
        this.ctx = ctx
        this.config = config;
        this.players = {
            player1: new Player(1, config.players[0].name, config.players[0].color, config.players[0].character, config.players[0].img, config.totalDisks, new Disk(0, 0, config.tileSize / 3, config.players[0].color)),
            player2: new Player(2, config.players[1].name, config.players[1].color, config.players[1].character, config.players[1].img, config.totalDisks, new Disk(0, 0, config.tileSize / 3, config.players[1].color))
        };
        this.board = new Board(config.width / 2 - config.cols / 2 * config.tileSize, config.height / 2 - config.rows / 2 * config.tileSize, config.tileSize, config.rows, config.cols);
        this.currentPlayer = this.players.player1;
        this.pile1 = null;
        this.pile2 = null;
    }

    initGame() {
        //Clears previous board
        this.ctx.clearRect(0, 0, this.config.width, this.config.height);
        this.ctx.canvas.parentElement.querySelector('.player-info.p1')?.remove();
        this.ctx.canvas.parentElement.querySelector('.player-info.p2')?.remove();
        //Draws new board
        this.board.draw(this.ctx);
        this.players.player1.displayPlayerInfo(this.ctx, 1);
        this.pile1 = this.players.player1.getPileCanvas();
        this.players.player2.displayPlayerInfo(this.ctx, 2);
        this.pile2 = this.players.player2.getPileCanvas();
        this.pile1.addEventListener('mousedown', (e) => {
            if(this.currentPlayer !== this.players.player1) return;
            this.players.player1.consumeDisk();
            this.players.player1.updateDiskPile();
            this.pile1.addEventListener('mousemove', (e) => this.moveDisk(e));
            this.pile1.parentElement.addEventListener('mousemove', (e) => this.moveDisk(e));
            this.ctx.canvas.addEventListener('mousemove', (e) => this.moveDisk(e));
        }
        );
        this.pile2.addEventListener('mousedown', (e) => {
            if(this.currentPlayer !== this.players.player2) return;
            this.players.player2.consumeDisk();
            this.players.player2.updateDiskPile();
            this.pile2.addEventListener('mousemove', (e) => this.moveDisk(e));
            this.pile2.parentElement.addEventListener('mousemove', (e) => this.moveDisk(e));
            this.ctx.canvas.addEventListener('mousemove', (e) => this.moveDisk(e));
        }
        );
    }

    moveDisk(e) {
        let x = e.clientX - this.ctx.canvas.getBoundingClientRect().left;
        let y = e.clientY - this.ctx.canvas.getBoundingClientRect().top;
        let disk = this.currentPlayer.getDisk();
        disk.move(x, y);
        this.ctx.clearRect(0, 0, this.config.width, this.config.height);
        this.board.draw(this.ctx);
        disk.draw(this.ctx);
    }

    getBoard() {
        return this.board;
    }

    isTurnOfPlayerOne() {
        return this.currentPlayer === this.players.player1;
    }

    switchTurns() {
        this.currentPlayer = this.currentPlayer === this.players.player1 ? this.players.player2 : this.players.player1;
    }


}

export default Game;