export class TimeService{
    constructor () {
        // this.currentTime = currentTime;
    }
    getCurrentTime(callback) {
        // var time = new Date().toLocaleTimeString();
        // return time;
        callback(new Date());
        setInterval(function() {
            callback(new Date());
        }, 1000);
    }

};

