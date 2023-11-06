import Player from './Player.js';
import Board from './Board.js';
import Disk from './Disk.js';
import Timer from './Timer.js';
class Game {
  constructor(config) {
    this.ctx = config.context;
    this.auxCanvas = null;
    this.auxCtx = null;
    this.config = config;
    this.players = {
      player1: new Player(config.players[0].name, config.players[0].color, config.players[0].character, config.players[0].img, config.totalDisks, new Disk(0, 0, config.tileSize * 0.3, config.players[0].color, config.players[0].character)),
      player2: new Player(config.players[1].name, config.players[1].color, config.players[1].character, config.players[1].img, config.totalDisks, new Disk(0, 0, config.tileSize * 0.3, config.players[1].color, config.players[1].character))
    };
    this.board = null;
    this.currentPlayer = this.players.player1;
    this.winNumber = config.winNumber;
    this.speed = config.speed;
    this.timer = new Timer(config.time, this);
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

    this.players.player1.getPileCanvas().addEventListener('mousedown', async (e) => {
      if (this.currentPlayer !== this.players.player1) return;
      this.playTurn();
    });

    this.players.player2.getPileCanvas().addEventListener('mousedown', (e) => {
      if (this.currentPlayer !== this.players.player2) return;
      this.playTurn();
    });

    this.timer.start();
  }

  initScreen() {
    //Clears previous board if it exists
    this.ctx.clearRect(0, 0, this.config.width, this.config.height);
    this.ctx.canvas.parentElement.querySelector('.player-info.p1')?.remove();
    this.ctx.canvas.parentElement.querySelector('.player-info.p2')?.remove();
    this.ctx.canvas.parentElement.querySelector('.winner')?.remove();

    //Draws new board
    this.board.draw(this.ctx);

    this.players.player1.fillDisks(this.config.totalDisks);
    this.players.player1.displayPlayerInfo(this.ctx, 1);
    this.players.player2.fillDisks(this.config.totalDisks);
    this.players.player2.displayPlayerInfo(this.ctx, 2);
  }

  initSecondaryCanvas() {
    //Creates a temporary canvas to move the disk
    this.tempCanvas = document.createElement('canvas');
    this.tempCanvas.width = this.config.width;
    this.tempCanvas.height = this.config.height;
    this.tempCanvas.classList.add('temporal-canvas');
    this.tempCtx = this.tempCanvas.getContext('2d');

    const moveDisk = (e) => this.moveDisk(e);
    const cancelMove = () => this.cancelMove();
    const dropDisk = async (e) => await this.dropDisk(e, moveDisk, dropDisk, cancelMove);

    this.tempCanvas.addEventListener('mousemove', moveDisk);
    this.tempCanvas.addEventListener('mouseup', dropDisk);
    this.tempCanvas.addEventListener('mouseleave', cancelMove);
  }

  playTurn() {
    this.currentPlayer.consumeDisk();
    this.currentPlayer.updateDiskPile();
    this.currentPlayer.getDisk().move(0, 0);
    //From now on the temporary canvas takes over the mouse events until it closes
    this.ctx.canvas.parentElement.appendChild(this.tempCanvas);
  }

  moveDisk(e) {
    let bounds = e.target.getBoundingClientRect();
    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;
    x /= bounds.width;
    y /= bounds.height;
    x *= e.target.width;
    y *= e.target.height;
    let disk = this.currentPlayer.getDisk();
    if (disk.getPosition().x !== x || disk.getPosition().y !== y) {
      this.tempCtx.clearRect(0, 0, this.config.width, this.config.height);
      disk.move(x, y);
      disk.draw(this.tempCtx);
    }
  }

  async dropDisk(e, moveDiskFunction, dropDiskFunction, cancelMoveFunction) {
    this.tempCtx.clearRect(0, 0, this.config.width, this.config.height);
    this.tempCanvas.removeEventListener('mousemove', moveDiskFunction);
    this.tempCanvas.removeEventListener('mouseup', dropDiskFunction);
    this.tempCanvas.removeEventListener('mouseleave', cancelMoveFunction);
    this.tempCanvas.classList.add('dying');

    let col = this.getColumn();

    let [success, row, column] = await this.board.putDisk(this.ctx, this.currentPlayer.disk.makeCopy(), this.config.tileSize / this.config.speed, col);

    if (success) {
      await this.checkWin(row, column);
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

  async checkWin(row, col) {
    let disk = this.board[row][col].getDisk();
    if (this.checkHorizontal(row, col, disk) || this.checkVertical(row, col, disk) || this.checkDiagonal(row, col, disk)) {
      this.currentPlayer.incrementScore();
      await this.showEndGameScreen(true);
    }
    else if
      (this.players.player1.getRemainingDisks() === 0
      &&
      this.players.player2.getRemainingDisks() === 0) {
      await this.showEndGameScreen(false, false);
    }
  }

  async showEndGameScreen(winner, timeout) {
    let message = document.createElement('div');
    message.classList.add('winner', 'd-flex-col', 'align-center', 'justify-between');
    this.ctx.canvas.parentElement.appendChild(message);
    await new Promise(resolve => setTimeout(resolve, 100));
    message.classList.add('show');
    await new Promise(resolve => setTimeout(resolve, 500));
    const backgroundMusic = document.getElementById("music");
    if (winner) {
      message.innerHTML = `
            <h1>${this.currentPlayer.getName()} wins!</h1>
            <img src="${this.currentPlayer.getImage()}" alt="${this.currentPlayer.getName()}">
            <span>Score: ${this.currentPlayer.getScore()}</span>
            <h2>Play again!</h2>
        `;
      if (backgroundMusic.paused) {
        backgroundMusic.src = './assets/music/win-music.mp3'
        backgroundMusic.pause();
      }
    } else {
      if (backgroundMusic.paused) {
        backgroundMusic.src = './assets/music/win-music.mp3'
        backgroundMusic.pause();
      }
      message.innerHTML = `
            <h1>Draw! ${timeout ? "Time's up!" : "You ran out of disks."}</h1>
            <h2>Play again!</h2>
        `;
    }

    message.querySelector('h2').addEventListener('click', () => {
      let aux = this.players.player1;
      this.players.player1 = this.players.player2;
      this.players.player2 = aux;
      this.currentPlayer = this.players.player1;
      if (backgroundMusic.paused) {
        backgroundMusic.src = './assets/music/undertale.mp3';
        backgroundMusic.pause();
      }
      this.initGame();
    });

    this.timer.stop();
  }

  checkHorizontal(row, col, disk) {
    let count = 1;
    let i;
    if (col !== 0) {
      i = col - 1;
      while (i >= 0 && this.board[row][i].getDisk()?.getColor() === disk.getColor()) {
        count++;
        i--;
      }
    }
    if (col !== this.config.cols - 1) {
      i = col + 1;
      while (i < this.config.cols && this.board[row][i].getDisk()?.getColor() === disk.getColor()) {
        count++;
        i++;
      }
    }
    if (count >= this.winNumber) return true;
  }

  checkVertical(row, col, disk) {
    let count = 1;
    let i;

    if (row !== 0) {
      i = row - 1;
      while (i >= 0 && this.board[i][col].getDisk()?.getColor() === disk.getColor()) {
        count++;
        i--;
      }
    }

    if (row !== this.config.rows - 1) {
      i = row + 1;
      while (i < this.config.rows && this.board[i][col].getDisk()?.getColor() === disk.getColor()) {
        count++;
        i++;
      }
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

  endGame() {
    this.showEndGameScreen(false, true);
  }
}

export default Game;