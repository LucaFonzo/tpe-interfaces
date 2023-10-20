class Layer {
    constructor() {
        this.circles = [];
    }

    addCircle(circle) {
        this.circles.push(circle);
    }

    draw() {
        this.circles.forEach(circle => circle.draw());
    }

    check(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        
        this.circles.forEach(circle => {
            const dx = circle.x - x;
            const dy = circle.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= circle.radius) {
                if(circle.color == 'green'){
                    circle.color = 'red';
                }
                else{
                    circle.color = 'green';
                }
            }
        });

        this.draw();
    }
}

export default Layer;