Cooking book
============

**Note:** <br />
This branch  is translated into bulgarian for needs of my [Master's thesis](https://github.com/oNora/university-tasks/tree/master/Master's-thesis).
<br />
[Demo](http://onora.github.io/angularjs_projects/cooking-book)<br />

Уеб приложене с Angular, представлявощо онлайн версия на кнога с рецепти. <br />

Функционалност:

- добавяне и запазване на рецепти - всяка рецепта има име, описание и продукти (за всеки продукт има име, количест и мерна единца)
- редактиране и триене на рецепти
- търсене на рецепта по напични продукти. Резултата от търсенето е списък с рецепти, които може да се приготвят използвайки наличните продукти

Тестове - ползва Karma с Jasmine

Как се стартира проекта
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
Трябва прокта да се стартира под locahost. Бърз начин да се постигне това е чрез [XAMPP](https://www.apachefriends.org/index.html), [WAMP](http://www.wampserver.com/en/) или [http-server](https://www.npmjs.com/package/http-server).
