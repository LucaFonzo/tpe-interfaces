class Tile {
    constructor (x, y, img) {
        this.x = x;
        this.y = y;
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
        ctx.rect(this.x, this.y, 60, 60);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.save();
        ctx.beginPath();
	    ctx.arc(this.x + 30, this.y + 30, 18, 0, 2*Math.PI);
	    ctx.clip();
	    ctx.clearRect(this.x, this.y, 60, 60);
        ctx.restore();
        //ctx.drawImage(this.image, this.x, this.y, 50, 50);
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

    animateFall(ctx, disk, x, y, speed) {
        let radius = disk.getRadius();
        let color = disk.getColor();
        let dx = (x - this.x) / speed;
        let dy = (y - this.y) / speed;
        let i = 0;
        let interval = setInterval(() => {
            ctx.clearRect(this.x, this.y, 60, 60);
            ctx.beginPath();
            ctx.arc(this.x + radius/2, this.y + radius/2, radius, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            //ctx.drawImage(this.disk.image, this.x, this.y, 60, 60);
            this.x += dx;
            this.y += dy;
            i++;
            if (i === speed) {
                clearInterval(interval);
            }
        }, 10);
    }
}

export default Tile;