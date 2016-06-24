(function(app) {

    var Class = ng.core.Class;

    app.TimeService = Class({
        constructor: function TimeService() {
            // this.currentTime = currentTime;
        },
        getCurrentTime: function (callback) {
            // var time = new Date().toLocaleTimeString();
            // return time;
            callback(new Date());
            setInterval(function() {
                callback(new Date());
            }, 1000);
        }

    });

})( window.app || (window.app = {}) );
