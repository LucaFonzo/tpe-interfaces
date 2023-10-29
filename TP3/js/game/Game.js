import Player from './Player.js';
import Board from './Board.js';
class Game {
    constructor(ctx, config) {
        this.ctx = ctx
        this.config = config;
        this.players = {
            player1: new Player(1, config.players[0].name, config.players[0].color, config.players[0].character, config.players[0].img, config.totalDisks),
            player2: new Player(2, config.players[1].name, config.players[1].color, config.players[1].character, config.players[1].img, config.totalDisks)
        };
        this.board = new Board(config.width / 2 - config.cols / 2 * config.tileSize, config.height / 2 - config.rows / 2 * config.tileSize, config.tileSize, config.rows, config.cols);
        this.currentPlayer = this.players.player1;
    }

    initGame() {
        this.ctx.clearRect(0, 0, this.config.width, this.config.height);
        this.board.draw(this.ctx);
        this.players.player1.displayPlayerInfo(this.ctx, 1);
        this.players.player2.displayPlayerInfo(this.ctx, 2);
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