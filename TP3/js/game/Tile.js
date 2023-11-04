class Tile {
    constructor(x, y, size, img) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.imageUrl = img;
        this.image = new Image();
        this.image.src = this.imageUrl;
        this.disk = null;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    getDisk() {
        return this.disk;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }

    generateHole(ctx) {
        ctx.beginPath();
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size/3, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
    }

    async putDisk(ctx, disk, speed) {
        this.disk = disk;
        await this.animateFall(ctx, disk, speed, false)
    }

    async animateFall(ctx, disk, speed, complete) {
        ctx.save();
        let dy = 0;
        let i = 0;
        let limit = complete ? this.size + disk.getRadius() : this.size / 2;
        this.generateHole(ctx);
        while (dy <= limit) {
            dy = i * speed;
            ctx.clearRect(this.x, this.y, this.size, this.size);
            this.draw(ctx);
            disk.move(this.x + this.size / 2, this.y + dy);
            disk.draw(ctx);
            i++;
            await new Promise((resolve) => setTimeout(resolve, 10));
        }
        if (!complete) {
            ctx.clearRect(this.x, this.y, this.size, this.size);
            disk.move(this.x + this.size / 2, this.y + this.size / 2);
            disk.draw(ctx);
        }
        ctx.restore();
    }
}

export default Tile;