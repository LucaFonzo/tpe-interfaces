class Disk {
  constructor(x, y, radius, color, character) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.character = character;
  }

  makeCopy() {
    return new Disk(0, 0, this.radius, this.color, this.character);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getRadius() {
    return this.radius;
  }

  getColor() {
    return this.color;
  }

  draw(ctx) {
    ctx.beginPath();
    const imageColor = new Image();
    const imageCharacter = new Image();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    imageCharacter.src = this.character;
    imageColor.src = this.color;
    imageCharacter.onload = () => {
      ctx.drawImage(imageCharacter, this.x - 25, this.y - 22, 50, 50);
    };
    imageColor.onload = () => {
      ctx.drawImage(imageColor, this.x - 25, this.y - 22, 50, 50);
    };
    ctx.closePath();
  }
}

export default Disk;