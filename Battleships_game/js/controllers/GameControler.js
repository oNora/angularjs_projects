battleShips.controller('GameControler', function GameControler($scope, ShipModel, singleShip, boardConfig, fireModel) {
    $scope.tableRow = boardConfig.alphabet;
    $scope.boardSize = boardConfig.boardSize;

    init();
    /**
     * Get instance of ShipModel - create ships on the board.
     */
    function init() {
        ShipModel.generateShipLocations();
    }

    /**
     * Show messages to the player about the status of the hit.
     * @param  {[Array]} params - array with variable length. It contains fire messages and when all ships are sunk contains messages and the number of all shots
     */
    function fireMsg(params){
        var msg = params[0],
            numberGuess = params[1] == undefined ? '' : params[1];
        $scope.fireMsg = msg + numberGuess;
    }

    /**
     * Handle the hit on the board.
     * @param  {String} guess - id of hit cell
     * @return {Boolean}      - if  the cell is already hit or it is new hit of this cell
     */
    function locationFire (guess) {
        for (var i = 0; i < ShipModel.numShips; i++) {
            var ship = ShipModel.ships[i];
            var index = ship.locations.indexOf(guess);

            if (ship.hits[index] === "hit") {
                fireMsg([boardConfig.ALREADY_HIT]);
                return true;
            } else if (index >= 0) {
                ship.hits[index] = "hit";
                fireMsg([boardConfig.HIT]);

                if (ShipModel.isSunk(ship, ShipModel.shipLength[i])) {
                    fireMsg([boardConfig.YOU_SANK_ONE]);
                    ShipModel.shipsSunk++;
                }
                return true;
            }
        }

        fireMsg([boardConfig.YOU_MISSED]);
    };


    /**
     * @type {Number} - the number of shots on the board
     */
    var guesses = 0;

    /**
     * Fire function for input field (keyboard)
     * @param  {String} guessInput - coordinates of hit cell
     * @param  {Object} keyEvent   - keyboard press event
     */
    $scope.fire = function(guessInput, keyEvent){

        // hide menu if it is open
        if($scope.showMenu == false){
            $scope.toggle();
        }

        if (keyEvent === undefined || keyEvent.which === 13 ){
            var location = fireModel.fire(guessInput.toUpperCase());

            if (location) {

                guesses++;
                var hit = locationFire(location);

                if (hit && ShipModel.shipsSunk === ShipModel.numShips) {
                    fireMsg([boardConfig.YOU_SANK, guesses]);
                }

                var inputUpperCase = guessInput.toUpperCase(),
                    row = boardConfig.alphabet.indexOf(inputUpperCase.charAt(0)),
                    selector = row + inputUpperCase.charAt(1),
                    el = document.getElementById(selector);

                if (hit){
                    angular.element(el).addClass('hitShip');
                    angular.element(el).text('x');

                }else{
                    angular.element(el).addClass('hitCell');
                    angular.element(el).text('-');
                }

                var selectInput = document.getElementById('guessInput');
                angular.element(selectInput).val('');

                // hide all ships if they are shown
                $scope.hideShips();
            }
        }
    }

    /**
     * Fire function with direct hit on the board using mouse
     * @param  {Object} clickEvent   - mouse click event
     */
    $scope.clickFire = function(clickEvent){
        // hide all ship if they are shown
        $scope.hideShips();

        // hide menu if it is open
        if($scope.showMenu == false){
            $scope.toggle();
        }

        var clickedRow = clickEvent.target.id.charAt(0),
            clickedColumn = clickEvent.target.id.charAt(1),
            clickedLetter =  boardConfig.alphabet[clickedRow],
            clickedGuess = clickedLetter + clickedColumn,
            location = fireModel.fire(clickedGuess);


        if (location) {

            guesses++;
            var hit = locationFire(location);

            if (hit && ShipModel.shipsSunk === ShipModel.numShips) {
                fireMsg([boardConfig.YOU_SANK, guesses]);
            }

            if (hit){
                clickEvent.target.innerText = "x";
                clickEvent.target.className = "hitShip";
            }else{
                clickEvent.target.innerText = "-";
                clickEvent.target.className = "hitCell";
            }

        }

    }

    /**
     * @type {Boolean} - initial menu status
     */
    $scope.showMenu = true;
    /**
     * toggle menu status - show and hide
     */
    $scope.toggle = function() {
        $scope.showMenu = !$scope.showMenu;
    }

   /**
    * Show ships on the board and toggle menu status
    */
    $scope.showShips = function (){

        var allShips = ShipModel.ships,
            singleShip,
            shipElement;

        var el = document.querySelectorAll('.gameCell');
        var shipSelector;
        angular.element(el).text('');

        for (singleShip in allShips) {

            for (var i = 0; i < allShips[singleShip].locations.length; i++) {
                allShips[singleShip].locations[i];

                shipSelector = allShips[singleShip].locations[i];
                shipElement =  document.getElementById(shipSelector);
                angular.element(shipElement).text('x');

            };
        }

        $scope.toggle();

    }

   /**
    * Hide ships on the board and toggle menu status
    */
    $scope.hideShips = function (){

        var el = document.querySelectorAll('td');

        angular.forEach(el, function(value, key) {

            if( (angular.element(value).hasClass('hitShip') == false)
                && angular.element(value).hasClass('gameCell') == true
                && (angular.element(value).hasClass('hitCell') == false) ){

                angular.element(value).text('.');
            }
        });


    }

});