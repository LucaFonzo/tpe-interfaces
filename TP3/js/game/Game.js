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
        this.ctx.canvas.parentElement.querySelector('.winner')?.remove();
        this.players.player1.fillDisks(this.config.totalDisks);
        this.players.player2.fillDisks(this.config.totalDisks);
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
                this.checkWin(success[1], success[2]);
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

    checkWin(row, col) {
        let disk = this.board[row][col].getDisk();
        if (this.checkHorizontal(row, col, disk) || this.checkVertical(row, col, disk) || this.checkDiagonal(row, col, disk)) {
            this.currentPlayer.incrementScore();
            let winner = document.createElement('div');
            winner.classList.add('winner');
            winner.innerHTML = `
                <div>
                    <h1>${this.currentPlayer.getName()} wins!</h1>
                    <button class="primary-btn">Play again</button>
                </div>
            `;
            winner.height = this.config.height;
            winner.width = this.config.width;
            winner.querySelector('button').addEventListener('click', () => {
                this.initGame();
                this.currentPlayer = this.players.player1;
            });
            this.ctx.canvas.parentElement.appendChild(winner);
        }
    }

    checkHorizontal(row, col, disk) {
        let count = 1;
        let i = col - 1;
        while (i >= 0 && this.board[row][i].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i--;
            if(count >= 4) return true;
        }
        i = col + 1;
        while (i < this.config.cols && this.board[row][i].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i++;
            if(count >= 4) return true;
        }
    }

    checkVertical(row, col, disk) {
        let count = 1;
        let i = row - 1;
        while (i >= 0 && this.board[i][col].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i--;
            if(count >= 4) return true;
        }
        i = row + 1;
        while (i < this.config.rows && this.board[i][col].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i++;
            if(count >= 4) return true;
        }
    }

    checkDiagonal(row, col, disk) {
        let count = 1;
        let i = row - 1;
        let j = col - 1;
        while (i >= 0 && j >= 0 && this.board[i][j].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i--;
            j--;
            if(count >= 4) return true;
        }
        i = row + 1;
        j = col + 1;
        while (i < this.config.rows && j < this.config.cols && this.board[i][j].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i++;
            j++;
            if(count >= 4) return true;
        }
        count = 1;
        i = row - 1;
        j = col + 1;
        while (i >= 0 && j < this.config.cols && this.board[i][j].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i--;
            j++;
            if(count >= 4) return true;
        }
        i = row + 1;
        j = col - 1;
        while (i < this.config.rows && j >= 0 && this.board[i][j].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i++;
            j--;
            if(count >= 4) return true;
        }
    }


}

export default Game;