class Player {
    constructor (playerNumber, name, color, character) {
        this.playerNumber = playerNumber;
        this.name = name;
        this.character = character;
        this.color = color;
        this.score = 0;
        this.totalDisks = 10;
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

    getCharacter() {
        return this.character;
    }

    setName(name) {
        this.name = name;
    }

    setColor(color) {
        this.color = color;
    }

    setCharacter(character) {
        this.character = character;
    }

    incrementScore() {
        this.score++;
    }

    drawCharacterInfo(ctx, x, y) {
        let div = document.createElement('div');
        div.classList.add('player');
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.innerHTML = `
            <div class="character">
                <span>${this.name}</span>
                <span>Total score ${this.score}</span>
            </div>
            <div style="background-color: ${this.color}"></div>
        `;
        ctx.canvas.appendChil(div);
    }

}

export default Player;