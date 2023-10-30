class Player {
    constructor(playerNumber, name, color, character, image, totalDisks, disk) {
        this.playerNumber = playerNumber;
        this.name = name;
        this.character = character;
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

    getDisk() {
        return this.disk;
    }

    displayPlayerInfo(ctx, playerNumber) {
        let canvas = ctx.canvas;
        let div = document.createElement('div');
        div.classList.add('player-info', `p${playerNumber}`);
        div.innerHTML = `
            <div>
                <h2>${this.score}</h2>
                <div class="user-picture">
                    <img src="${this.image}" alt="${this.name}">
                </div>
                <span>${this.name} (${this.character})</span>
            </div>
            <canvas></canvas>
        `;
        canvas.parentElement.appendChild(div);
        this.subctx = div.querySelector('canvas').getContext('2d');
        this.subctx.canvas.width = 2 * this.disk.radius;
        this.updateDiskPile();
    }

    updateDiskPile() {
        let height = 10 * this.totalDisks;
        this.subctx.canvas.height = height;
        this.subctx.clearRect(0, 0, 2 * this.disk.radius, height);
        this.subctx.strokeStyle = this.color;
        this.subctx.lineWidth = 8;
        for (let i = 0; i < this.totalDisks; i++) {
            this.subctx.beginPath();
            this.subctx.moveTo(0, 8 * i+4);
            this.subctx.lineTo(2 * this.disk.radius, 8 * i+4);
            this.subctx.stroke();
        }
        this.subctx.strokeStyle = 'white';
        this.subctx.lineWidth = 1;
        for (let i = 0; i < this.totalDisks; i++) {
            this.subctx.beginPath();
            this.subctx.moveTo(0, 1+8 * i);
            this.subctx.lineTo(2 * this.disk.radius, 1+8 * i);
            this.subctx.stroke();
        }
    }

    getPileCanvas(){
        return this.subctx.canvas;
    }
}

export default Player;