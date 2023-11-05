import Tile from "./Tile.js";

class Board {
    constructor(x, y, tileSize, tileStyle, rows, cols) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.tileStyle = tileStyle;
        this.rows = rows;
        this.cols = cols;
        this.tiles = [];
        this.initBoard();
    }

    initBoard() {
        let base = "assets/game/" + this.tileStyle;
        let url;
        for (let i = 0; i < this.rows; i++) {
            this[i] = [];
            for (let j = 0; j < this.cols; j++) {
                if (i === 0) {
                    if (j === 0) {
                        url = base + "-left-top-corner.png";
                    }
                    else if (j < this.cols - 1) {
                        url = base + "-mid.png";
                    }
                    else if (j === this.cols - 1) {
                        url = base + "-right-top-corner.png";
                    }
                }
                else if (i < this.rows - 1) {
                    url = base + "-mid.png";
                }
                else if (i === this.rows - 1) {
                    if (j === 0) {
                        url = base + "-left-bot-corner.png";
                    }
                    else if (j < this.cols - 1) {
                        url = base + "-mid.png";
                    }
                    else if (j === this.cols - 1) {
                        url = base + "-right-bot-corner.png";
                    }
                }
                this[i][j] = new Tile(this.x + j * this.tileSize, this.y + i * this.tileSize, this.tileSize, url);
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
        if (col == null) return [false, null, null];
        let tiles = this.getEmptyTiles(col);
        if (tiles == null) return [false, null, null];
        for (let i = 0; i < tiles.length - 1; i++) {
            await tiles[i].animateFall(ctx, disk, speed, true);
        }
        await tiles[tiles.length - 1].putDisk(ctx, disk, speed, false);
        this.draw(ctx);
        return [true, tiles.length - 1, col];
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