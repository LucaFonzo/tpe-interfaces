import Player from './Player.js';
import Board from './Board.js';
import Disk from './Disk.js';
class Game {
    constructor(config) {
        this.ctx = config.context;
        this.auxCanvas = null;
        this.auxCtx = null;
        this.config = config;
        this.players = {
            player1: new Player(config.players[0].name, config.players[0].color, config.players[0].character, config.players[0].img, config.totalDisks, new Disk(0, 0, config.tileSize / 3, config.players[0].color)),
            player2: new Player(config.players[1].name, config.players[1].color, config.players[1].character, config.players[1].img, config.totalDisks, new Disk(0, 0, config.tileSize / 3, config.players[1].color))
        };
        this.board = null;
        this.currentPlayer = this.players.player1;
        this.winNumber = config.winNumber;
        this.speed = config.speed;
    }

    initGame() {
        this.board = new Board(
            this.config.width / 2 - this.config.cols / 2 * this.config.tileSize,
            this.config.height / 2 - this.config.rows / 2 * this.config.tileSize,
            this.config.tileSize,
            this.config.tileStyle,
            this.config.rows,
            this.config.cols);

        this.initScreen();
        //Creates a temporary canvas to move the disk
        this.initSecondaryCanvas();
        /*
        this.players.player1.getPileCanvas().addEventListener('mousedown', async (e) => {
            if (this.currentPlayer !== this.players.player1) return;
            this.playTurn();
        });

        this.players.player2.getPileCanvas().addEventListener('mousedown', (e) => {
            if (this.currentPlayer !== this.players.player2) return;
            this.playTurn();
        });*/
    }

    initScreen() {
        //Clears previous board if it exists
        this.ctx.clearRect(0, 0, this.config.width, this.config.height);
        this.ctx.canvas.parentElement.querySelector('.player-info.p1')?.remove();
        this.ctx.canvas.parentElement.querySelector('.player-info.p2')?.remove();
        this.ctx.canvas.parentElement.querySelector('.winner')?.remove();

        //Draws new board
        this.board.draw(this.ctx);
        /*
        this.players.player1.fillDisks(this.config.totalDisks);
        this.players.player1.displayPlayerInfo(this.ctx, 1);
        this.players.player2.fillDisks(this.config.totalDisks);
        this.players.player2.displayPlayerInfo(this.ctx, 2);
        */
    }

    initSecondaryCanvas() {
        //Creates a temporary canvas to move the disk
        this.tempCanvas = document.createElement('canvas');
        this.tempCanvas.width = this.config.width;
        this.tempCanvas.height = this.config.height;
        this.tempCanvas.classList.add('temporal-canvas');
        this.tempCtx = this.tempCanvas.getContext('2d');

        const moveDisk = (e) => this.moveDisk(e);
        const dropDisk = async (e) => await this.dropDisk(e, moveDisk, dropDisk);

        this.tempCanvas.addEventListener('mousemove', moveDisk);
        this.tempCanvas.addEventListener('mouseup', dropDisk);
        this.tempCanvas.addEventListener('mouseleave', () => { this.cancelMove() });
    }

    playTurn() {
        this.currentPlayer.consumeDisk();
        this.currentPlayer.updateDiskPile();
        this.currentPlayer.getDisk().move(0, 0);
        //From now on the temporary canvas takes over the mouse events until it closes
        this.ctx.canvas.parentElement.appendChild(this.tempCanvas);
    }

    moveDisk(e) {
        let x = e.clientX - this.ctx.canvas.getBoundingClientRect().left;
        let y = e.clientY - this.ctx.canvas.getBoundingClientRect().top;
        let disk = this.currentPlayer.getDisk();
        if (disk.getPosition().x !== x || disk.getPosition().y !== y) {
            this.tempCtx.clearRect(0, 0, this.config.width, this.config.height);
            disk.move(x, y);
            disk.draw(this.tempCtx);
        }
    }

    async dropDisk(e, moveDiskFunction, dropDiskFunction) {
        this.tempCtx.clearRect(0, 0, this.config.width, this.config.height);
        this.tempCanvas.removeEventListener('mousemove', moveDiskFunction);
        this.tempCanvas.removeEventListener('mouseup', dropDiskFunction);
        this.tempCanvas.classList.add('dying');

        let col = this.getColumn();

        let [success, row, column] = await this.board.putDisk(this.ctx, this.currentPlayer.disk.makeCopy(), this.config.tileSize / this.config.speed, col);

        if (success) {
            this.checkWin(row, column);
            this.switchTurns();
        }
        else {
            this.currentPlayer.restoreDisk();
            this.currentPlayer.updateDiskPile();
        }

        this.ctx.canvas.parentElement.removeChild(this.tempCanvas);
        this.tempCanvas.addEventListener('mousemove', moveDiskFunction);
        this.tempCanvas.addEventListener('mouseup', dropDiskFunction);
        this.tempCanvas.classList.remove('dying');
    }

    cancelMove() {
        this.tempCtx.clearRect(0, 0, this.config.width, this.config.height);
        this.currentPlayer.restoreDisk();
        this.currentPlayer.updateDiskPile();
        this.ctx.canvas.parentElement.removeChild(this.tempCanvas);
    }

    getColumn() {
        let x = this.currentPlayer.getDisk().getPosition().x;
        let col = Math.floor((x - this.board.x) / this.config.tileSize);
        if (col >= 0 && col < this.config.cols) {
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
            this.showWinnerScreen();
        }
    }

    showWinnerScreen() {
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
            let aux = this.players.player1;
            this.players.player1 = this.players.player2;
            this.players.player2 = aux;
            this.currentPlayer = this.players.player1;
            this.initGame();
        });
        this.ctx.canvas.parentElement.appendChild(winner);
    }

    checkHorizontal(row, col, disk) {
        let count = 1;
        let i = col - 1;
        while (i >= 0 && this.board[row][i].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i--;
        }
        i = col + 1;
        while (i < this.config.cols && this.board[row][i].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i++;
        }
        if (count >= this.winNumber) return true;
    }

    checkVertical(row, col, disk) {
        let count = 1;
        let i = row - 1;
        while (i >= 0 && this.board[i][col].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i--;
        }
        i = row + 1;
        while (i < this.config.rows && this.board[i][col].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i++;
        }
        if (count >= this.winNumber) return true;
    }

    checkDiagonal(row, col, disk) {
        let count = 1;
        let i = row - 1;
        let j = col - 1;
        while (i >= 0 && j >= 0 && this.board[i][j].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i--;
            j--;
        }
        i = row + 1;
        j = col + 1;
        while (i < this.config.rows && j < this.config.cols && this.board[i][j].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i++;
            j++;
        }
        if (count >= this.winNumber) return true;

        count = 1;
        i = row - 1;
        j = col + 1;
        while (i >= 0 && j < this.config.cols && this.board[i][j].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i--;
            j++;
        }
        i = row + 1;
        j = col - 1;
        while (i < this.config.rows && j >= 0 && this.board[i][j].getDisk()?.getColor() === disk.getColor()) {
            count++;
            i++;
            j--;
        }
        if (count >= this.winNumber) return true;
    }
}

export default Game;