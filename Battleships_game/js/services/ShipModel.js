battleShips.service('ShipModel', function ShipModel(boardConfig, singleShip) {

    /**
     * @type {Number} - number of ships
     * @const
     */
    var shipNumbers = 3;


    /**
     * Create ship model object
     * @property {Number} numShips  - the total number of ships
     * @property {Number} shipsSunk - the number of sunk ships
     * @property {Array} ships      - locations and hit locations of every ship
     * @property {Array} shipLength - array with length of evrey ship
     */
    var ShipModel = function() {
        this.numShips = shipNumbers;
        this.shipsSunk = 0;
        this.ships = collectAllShip(),
        this.shipLength = [
            this.ships[0].locations.length,
            this.ships[1].locations.length,
            this.ships[2].locations.length
        ]
    };


    /**
     * Collect all ships params in one array
     *
     * @return {Array} - contains object with locations and hits of every ships
     */
    function collectAllShip(){
        var ships =[];
        var shipParams ;

        for (var i = 0; i < shipNumbers; i++) {
            shipParams = singleShip.getInstance();
            ships.push(shipParams);
        };

        return ships;
    }


    /**
     * Method of ShipModel - generate locations of every ship
     */
    ShipModel.prototype.generateShipLocations = function() {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip(this.shipLength[i]);
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    };


    /**
     * Method of ShipModel - generate ship's direction
     * @param  {Number} shipLength - the lenght of every single ship
     *
     * @return {Array}             - All generated ships with their locations
     */
    ShipModel.prototype.generateShip = function(shipLength) {
        var direction = Math.floor(Math.random() * 2);
        var row, col;
        if (direction === 1) { // horizontal
            row = Math.floor(Math.random() * boardConfig.boardSize);
            col = Math.floor(Math.random() * (boardConfig.boardSize - shipLength + 1));
        } else { // vertical
            row = Math.floor(Math.random() * (boardConfig.boardSize - shipLength + 1));
            col = Math.floor(Math.random() * boardConfig.boardSize);
        }
        var newShipLocations = [];
        for (var i = 0; i < shipLength; i++) {

            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }

        return newShipLocations;
    };


    /**
     * Method of ShipModel       - ships can not overlap
     * @param  {Array} locations - location of every single ship
     *
     * @return {Boolean}         - if new created ship locations match with existing ship location
     */
    ShipModel.prototype.collision = function(locations) {

        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];

            for (var j = 0; j < locations.length; j++) {

                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    };


    /**
     * Method of ShipModel - check if part of the ship is hit
     * @param  {Object}  ship       - single ship object
     * @param  {Number}  thisLenght - ship's length
     *
     * @return {Boolean}            - if ship is hit
     */
    ShipModel.prototype.isSunk = function(ship , thisLenght) {
        for (var i = 0; i < thisLenght; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    };


    return new ShipModel();
});