battleShips.service('singleShip', function singleShip() {

    /**
     * Generate length params ( locations, hits ) of every ship in random between 3 and 5
     *
     * @return {Object}  -  parameters of single ship
     */
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


    return {

        getInstance: generateParams
    }

});