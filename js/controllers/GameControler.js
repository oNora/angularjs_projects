battleShips.controller('GameControler', function GameControler($scope, ShipModel, boardConfig, fireModel) {
    $scope.tableRow = boardConfig.alphabet;
    $scope.boardSize = boardConfig.boardSize;


	init();
 	function init() {
        $scope.ShipModel = ShipModel.generateShipLocations();
    }

    function fireMsg(params){
        var msg = params[0];
        var numberGuess = params[1] == undefined ? '' : params[1];
        $scope.fireMsg = msg + numberGuess;
    }


    function fireN (guess) {

    for (var i = 0; i < ShipModel.numShips; i++) {
        var ship = ShipModel.ships[i];
        var index = ship.locations.indexOf(guess);

        if (ship.hits[index] === "hit") {
            fireMsg([boardConfig.ALREADY_HIT]);
            return true;
        } else if (index >= 0) {
            ship.hits[index] = "hit";
            fireMsg([boardConfig.HIT]);


            // console.log("ShipModel.shipLength[i]: {0}", ShipModel.shipLength[i]);
            // console.log("ship: {0}", ship);
            if (ShipModel.isSunk(ship, ShipModel.shipLength[i])) {

                fireMsg([boardConfig.YOU_SANK_ONE]);
                ShipModel.shipsSunk++;
            }
            return true;
        }
    }
    fireMsg([guess]);
    fireMsg([boardConfig.YOU_MISSED]);
    return false;
    };


    var guesses = 0;
    $scope.fire = function(guessInput, keyEvent){

        if (keyEvent === undefined || keyEvent.which === 13 ){
            var location = fireModel(guessInput.toUpperCase());

            if (location) {

                guesses++;
                var hit = fireN(location);

                if (hit && ShipModel.shipsSunk === ShipModel.numShips) {

                    fireMsg([boardConfig.YOU_SANK, guesses]);

                }

                var inputUpperCase = guessInput.toUpperCase();
                var row = boardConfig.alphabet.indexOf(inputUpperCase.charAt(0));
                var selector = row + inputUpperCase.charAt(1);
                var el = document.getElementById(selector);

                console.log("el {}", el);

                if (hit){
                    angular.element(el).addClass('hitShip');
                    angular.element(el).text('x');
                }else{
                    angular.element(el).addClass('hitCell');
                    angular.element(el).text('-');
                }
            }
        }
	}

    $scope.clickFire = function(clickEvent){

        var clickedRow = clickEvent.target.id.charAt(0);
        var clickedColumn = clickEvent.target.id.charAt(1);
        var clickedLetter =  boardConfig.alphabet[clickedRow];

        var clickedGuess = clickedLetter + clickedColumn;

        var location = fireModel(clickedGuess);

        if (location) {

            guesses++;
            var hit = fireN(location);

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
            // console.log("hit : {}", hit);
        }

    }


    $scope.showMenu = true;
    $scope.toggle = function() {
        $scope.showMenu = !$scope.showMenu;
    }

   $scope.tryFunc = function () {
       console.log("focus");
   }


    $scope.showShips = function (){
        // console.log("ShipModel: ", ShipModel);
        // console.log("ShipModel ships: ", ShipModel.ships[0].locations);

        var allShips = ShipModel.ships,
            singleShip,
            shipElement;

        var el = document.querySelectorAll('.gameCell');
        var shipSelector;
        angular.element(el).text('');

        for (singleShip in allShips){
            console.log("allShips: ", allShips[singleShip].locations);
            for (var i = 0; i < allShips[singleShip].locations.length; i++) {
                allShips[singleShip].locations[i];

                shipSelector = allShips[singleShip].locations[i];
                shipElement =  document.getElementById(shipSelector);
                angular.element(shipElement).text('x');

            };
        }

    }

    $scope.hideShips = function (){
        var el = document.querySelectorAll('.gameCell');
        angular.element(el).text('.');
    }

});