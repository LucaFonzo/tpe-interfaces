class Disk {
  constructor(x, y, radius, color, character) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    const imageColor = new Image();
    imageColor.src = color;
    const imageCharacter = new Image();
    imageCharacter.src = character;
    this.color = imageColor;
    this.character = imageCharacter;
  }

  makeCopy() {
    return new Disk(0, 0, this.radius, this.color.src, this.character.src);
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
    return this.color.src;
  }

  draw(ctx) {
    let cornerLeft = this.x - this.radius;
    let cornerTop = this.y - this.radius;
    ctx.drawImage(this.color, cornerLeft, cornerTop, this.radius*2, this.radius*2);
    ctx.drawImage(this.character, cornerLeft + this.radius*0.4, cornerTop + this.radius * 0.4, this.radius*1.2, this.radius*1.2);
  }
}

export default Disk;