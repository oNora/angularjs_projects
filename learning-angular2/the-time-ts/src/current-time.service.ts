export class TimeService{
    constructor () {
    }
    getCurrentTime(callback: (time: Date) => void) {
        callback(new Date());
        setInterval(() => callback(new Date()), 1000);
    }

};

