class Player {
    constructor (name, color, character) {
        this.name = name;
        this.color = color;
        this.character = character;
        this.score = 0;
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

}

export default Player;