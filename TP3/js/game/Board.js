import Tile from "./Tile.js";

class Board {
    constructor(x, y, tileSize, rows, cols) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.rows = rows;
        this.cols = cols;
        this.tiles = [];
        this.initBoard();
    }

    initBoard() {
        for (let i = 0; i < this.rows; i++) {
            this[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this[i][j] = new Tile(this.x + j * this.tileSize, this.y + i * this.tileSize, this.tileSize, null);
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

    async putDisk(ctx, disk, speed, col) {
        let tiles = this.getEmptyTiles(col);
        if (tiles == null) return false;
        for (let i = 0; i < tiles.length - 1; i++) {
            await tiles[i].animateFall(ctx, disk, speed, true);
        }
        await tiles[tiles.length - 1].putDisk(ctx, disk, speed, false);
        return true;
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