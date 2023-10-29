class Player {
    constructor (playerNumber, name, color, character, image, totalDisks) {
        this.playerNumber = playerNumber;
        this.name = name;
        this.character = character;
        this.image = image;
        this.color = color;
        this.score = 0;
        this.totalDisks = totalDisks;
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

    displayPlayerInfo(ctx, playerNumber) {
        let canvas = ctx.canvas;
        let div = document.createElement('div');
        div.classList.add('player-info', `p${playerNumber}`);
        div.innerHTML = `
            <img src="${this.image}" alt="${this.name}">
            <span>${this.name}</span>
            <span>${this.score}</span>
        `;
        canvas.parentElement.appendChild(div);
    }

}

export default Player;