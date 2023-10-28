import Tile from "./Tile.js";

class Board {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.tiles = [];
        this.initBoard();
    }

    initBoard() {
        for (let i = 0; i < this.rows; i++) {
            this[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this[i][j] = new Tile(300 + j * 60, 150 + i * 60, 60, null);
            }
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this[i][j].draw(ctx);
            }
        }
    }

    async animateFall(ctx, disk, speed, col) {
        let tiles = this.getEmptyTiles(col);
        if (tiles == null) return;
        for (let i = 0; i < tiles.length - 1; i++) {
            await tiles[i].animateFall(ctx, disk, speed, true);
        }
        await tiles[tiles.length - 1].putDisk(ctx, disk, speed, false);
    }

    getEmptyTiles(col) {
        let tiles = [];
        for (let i = 0; i < this.rows; i++) {
            if (this[i][col].getDisk() == null) {
                tiles.push(this[i][col]);
            }
        }
        return tiles.length != 0 ? tiles : null;
    }

}

export default Board;