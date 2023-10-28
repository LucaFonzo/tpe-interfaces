class Tile {
    constructor (x, y, size, img) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.image = img;
        this.disk = null;
    }

    getPosition(){
        return {x: this.x, y: this.y};
    }

    getState () {
        return this.state;
    }

    getDisk () {
        return this.disk;
    }

    draw (ctx) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.save();
        this.generateHole(ctx);
        ctx.clearRect(this.x, this.y, this.size, this.size);
        ctx.restore();
        //ctx.drawImage(this.image, this.x, this.y, 50, 50);
    }

    generateHole (ctx) {
        ctx.beginPath();
	    ctx.arc(this.x + this.size/2, this.y + this.size/2, 18, 0, 2*Math.PI);
        ctx.closePath();
	    ctx.clip();
    }

    putDisk (ctx, disk) {
        this.disk = disk;
        let radius = disk.getRadius();
        let color = disk.getColor();
        ctx.beginPath();
        ctx.arc(this.x + radius/2, this.y + radius/2, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        //ctx.drawImage(this.disk.image, this.x, this.y, 60, 60);
    }

    async animateFall(ctx, disk, speed) {
        ctx.save();
        let dy = 0;
        let i = 0;
        this.generateHole(ctx);
        while(dy <= this.size + disk.getRadius()){
            dy = i * speed;
            ctx.clearRect(this.x, this.y, this.size, this.size);
            disk.move(this.x + this.size/2, this.y + dy);
            disk.draw(ctx);
            i++;
            await new Promise((resolve) => setTimeout(resolve, 10));
        }
        ctx.restore();
    }
}

export default Tile;