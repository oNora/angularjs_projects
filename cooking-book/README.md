cooking-book
============

Angular application that allows user to manage cooking recipes. <br />
**Note:**  *This project was created for my [Master's thesis](https://github.com/oNora/university-tasks/tree/master/Master's-thesis).* <br />
[Demo](http://onora.github.io/angularjs_projects/cooking-book/)

Features:

- entering and storing recipes - each recipe has a name, description and ingredients (for each ingredient has name, amount and amount units )
- editing and deletind recipes
- search for recipes based on the available ingredients. The search returns the list of recipes that can be prepared using the available ingredients.

Unit Testing - Karma with Jasmine. 

Quick start
============

```bash
# clone the repo
$ git clone https://github.com/oNora/angularjs_projects.git

# change directory to the project
$ cd cooking-book

# install the dependencies with npm
$ npm install

# build the project
$ grunt build

# build the project in "watch mode"
$ grunt dev

# run unit tests
$ karma start
```

