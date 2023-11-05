class Timer {
    constructor(time, game){
        this.startTime = null;
        this.maxTime = time;
        this.timerView = document.querySelector('.timer');
        this.timer = null;
        this.game = game;
    }

    async start(){
        this.startTime = new Date().getTime();
        this.timerView.innerHTML = this.maxTime;
        this.timer = setInterval(() => {
            this.update();
        }, 1000);
    }

    async update(){
        let currentTime = new Date().getTime();
        let timeDiff = currentTime - this.startTime;
        let timeLeft = this.maxTime - Math.floor(timeDiff / 1000);
        this.time = timeLeft;
        this.timerView.innerHTML = this.time;
        if(this.time <= 0){
            clearInterval(this.timer);
            this.timerView.innerHTML = 0;
            this.game.endGame();
        }
    }

    async stop(){
        clearInterval(this.timer);
    }
}

export default Timer;