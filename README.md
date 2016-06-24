Description
============

###I. `Battleships_game`

####Simple game of battleships
Simple application to allow a single human player to play a one-sided game using **angularjs**

Params:
- boadr size - 10x10 grid
- ships numbers - 3 (constant variable in code)
- ships length - they are generating automatically random in every single game and their length varies between 3 to 5 square (grid) length
- Ships can touch but they must not overlap

####Gameplay:

1. Menu has two options:
  - new game - generate new game
  - show ships - backdoor cheat :)
2. How to hit ships:
  - the game accept direct cklick on the board with mouse
  - using input field and "Fire!!!" button <br />
  Enter coordinates (row, col), e.g. A5 <br />
  Accept input from the player with uppercase and lowercase letters
3. Game messages location: <br />
  Player's report of hit result - if he miss or hit a ships and report when a ship is shunk. Report the number of shots taken once the game complete.
4. Cells feedback: <br />
  - . = no shot  <br />
  - - = miss  <br />
  - X = hit

###II. `cooking-book`
Angular application that allows user to manage cooking recipes. <br />
-**Note:**  *it's still in progress ...*

Features:

- entering and storing recipes - each recipe has a name, description and ingredients (for each ingredient has name, amount and amount units )
- editing and deletind recipes
- search for recipes based on the available ingredients. The search returns the list of recipes that can be prepared using the available ingredients.

Unit Testing - Karma with Jasmine. 

###III. `learning-angular2`

A collection of task that I am using to learn Angular2. <br />
Some of this tasks are created during [Angular 2 From The Ground Up](https://www.udemy.com/angular-2-from-the-ground-up/) course.
