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
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
}

export default Disk;