module.exports = class Timer{
    constructor(waitTime= 1000){
        this.counter = 0;
        this.interval = undefined;
        this.waitTime = waitTime;
    }

    Start(timerCallBackFunction){
        timerCallBackFunction();
        this.interval = setInterval(timerCallBackFunction, this.waitTime);

    }
    Reset(){
        this.counter = 0;
        clearInterval(this.interval);
    }
}