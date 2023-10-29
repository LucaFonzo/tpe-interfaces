class Game {
    constructor(ctx, nameP1, nameP2) {
        this.ctx = ctx;
        this.players = {
            player1: new Player(nameP1, "red", "X"),
            player2: new Player(nameP2, "blue", "O")
        };
        this.board = new Board(width/2-3.5*tileSize, height/2-3*tileSize, tileSize, rows, cols);
        this.currentPlayer = null;
    }

    initGame() {
        this.currentPlayer = this.players.player1;
        this.players.player1.drawCharacterInfo(this.ctx, 0, 0);
        this.board.draw(this.ctx);
    }

    
}

export default Game;