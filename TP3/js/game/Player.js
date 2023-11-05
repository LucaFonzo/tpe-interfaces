class Player {
    constructor(name, color, character, image, totalDisks, disk) {
        this.name = name;
        let char = character.slice(12);
        this.character = char.charAt(0).toUpperCase() + char.slice(1, -4);
        this.image = image;
        this.color = color;
        this.score = 0;
        this.totalDisks = totalDisks;
        this.disk = disk;
        this.subctx = null;
    }

    getName() {
        return this.name;
    }

    getColor() {
        return this.color;
    }

    getScore() {
        return this.score;
    }

    getImage() {
        return this.image;
    }

    setColor(color) {
        this.color = color;
    }

    incrementScore() {
        this.score++;
    }

    consumeDisk() {
        this.totalDisks--;
    }

    restoreDisk() {
        this.totalDisks++;
    }

    fillDisks(totalDisks) {
        this.totalDisks = totalDisks;
    }

    getDisk() {
        return this.disk;
    }

    displayPlayerInfo(ctx, playerNumber) {
        let canvas = ctx.canvas;
        let div = document.querySelector(`.player.p${playerNumber}`);

        div.innerHTML = `
            <div class="d-flex-col align-center justify-center">
                <h2>${this.score}</h2>
                <img src="${this.image}" alt="player ${playerNumber}">
                <h2>${this.name} (${this.character})</h2>
            </div>
            <canvas></canvas>
        `;
        div.classList.add('active');
        canvas.parentElement.prepend(div);
        this.subctx = div.querySelector('canvas').getContext('2d');
        this.subctx.canvas.width = 100;
        this.updateDiskPile();
    }

    updateDiskPile() {
        let height = 13 * this.totalDisks;
        this.subctx.canvas.height = height;
        this.subctx.clearRect(0, 0, 100, height);
        let img = new Image(100, 13);
        img.src = this.color.slice(0, -4) + '-side.png';
        this.subctx.fillStyle = this.subctx.createPattern(img, 'repeat');
        this.subctx.fillRect(0, 0, 100, height);
    }

    getPileCanvas() {
        return this.subctx.canvas;
    }
}

export default Player;