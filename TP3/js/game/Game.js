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
        //Creates a temporary canvas to move the disk
        let tempCanvas = this.initMoveDiskCanvas();

        this.pile1.addEventListener('mousedown', async (e) => {
            if (this.currentPlayer !== this.players.player1) return;
             
            this.currentPlayer.consumeDisk();
            this.currentPlayer.updateDiskPile();
            this.ctx.canvas.parentElement.appendChild(tempCanvas);
        });

        this.pile2.addEventListener('mousedown', (e) => {
            if (this.currentPlayer !== this.players.player2) return;

            this.currentPlayer.consumeDisk();
            this.currentPlayer.updateDiskPile();
            this.ctx.canvas.parentElement.appendChild(tempCanvas);
        });
    }

    initMoveDiskCanvas() {
        let tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.config.width;
        tempCanvas.height = this.config.height;
        tempCanvas.classList.add('temporal-canvas');
        let tempCtx = tempCanvas.getContext('2d');
        const moveDisk = (e) => this.moveDisk(e, tempCtx);
        tempCanvas.addEventListener('mousemove', moveDisk);
        tempCanvas.addEventListener('mouseup', async (e) => {
            let col = this.getColumn();
            tempCtx.clearRect(0, 0, this.config.width, this.config.height);
            tempCanvas.removeEventListener('mousemove', moveDisk);
            tempCanvas.classList.add('dying');
            let success = await this.board.putDisk(this.ctx, this.currentPlayer.disk.makeCopy(), this.config.tileSize / 8, col);
            if (success) {
                this.switchTurns();
            }
            else {
                this.currentPlayer.restoreDisk();
                this.currentPlayer.updateDiskPile();
            }
            this.ctx.canvas.parentElement.removeChild(tempCanvas);
            tempCanvas.addEventListener('mousemove', moveDisk);
            tempCanvas.classList.remove('dying');
        });
        tempCanvas.addEventListener('mouseleave', (e) => {
            tempCtx.clearRect(0, 0, this.config.width, this.config.height);
            this.currentPlayer.restoreDisk();
            this.currentPlayer.updateDiskPile();
            this.ctx.canvas.parentElement.removeChild(tempCanvas);
        });

        return tempCanvas;
    }

    moveDisk(e, tempCtx) {
        let x = e.clientX - this.ctx.canvas.getBoundingClientRect().left;
        let y = e.clientY - this.ctx.canvas.getBoundingClientRect().top;
        let disk = this.currentPlayer.getDisk();
        if (disk.getPosition().x !== x || disk.getPosition().y !== y) {
            tempCtx.clearRect(0, 0, this.config.width, this.config.height);
            disk.move(x, y);
            disk.draw(tempCtx);
        }
    }

    getColumn() {
        let x = this.currentPlayer.getDisk().getPosition().x;
        let col = Math.floor((x - this.board.x) / this.config.tileSize);
        if(col >= 0 && col < this.config.cols){
            return col;
        }
        return null;
    }

    switchTurns() {
        this.currentPlayer = this.currentPlayer === this.players.player1 ? this.players.player2 : this.players.player1;
    }


}

export default Game;