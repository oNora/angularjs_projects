battleShips.service('singleShip', function singleShip() {


    function generateParams () {
        var rand = Math.floor(Math.random() * (6 - 3) + 3);
        var locationShip = [];
        var hitShip = [];

        for (var i = 0; i < rand; i++) {
            // console.log('for-a');
            locationShip.push(0);
            hitShip.push("");
        };

        return {
            locations : locationShip,
            hits: hitShip
        }
    }


    var SingleShip = function() {
        this.ship = generateParams()
    };

    return {

        getInstance: function() {
            return new SingleShip();
        }
    }

});