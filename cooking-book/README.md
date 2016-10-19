Cooking book
============

**Note:** <br />
This branch  is translated into bulgarian for needs of my [Master's thesis](https://github.com/oNora/university-tasks/tree/master/Master's-thesis).
<br />
[Към приложението](http://onora.github.io/angularjs_projects/cooking-book)<br />

Уеб приложене с Angular, представляващо онлайн версия на книга с рецепти. <br />

Функционалност:

- добавяне и запазване на рецепти - всяка рецепта се състои от име, описание и продукти (за всеки продукт състои от име, количест и мерна единца)
- редактиране и триене на рецепти
- търсене на рецепта по напични продукти. Резултата от търсенето е списък с рецепти, които може да се приготвят използвайки наличните продукти

Тестове - ползва Karma с Jasmine

Как се стартира проекта
============

```bash
# клониране на хранилището (репозиторито)
$ git clone https://github.com/oNora/angularjs_projects.git

# влез в директорията на проекта
$ cd cooking-book

# инсталиране на всички ресурси с npm
$ npm install

# стартиране на проекта в режим готов за пускане в експлатация
$ grunt build

# стартиране на проекта в режим среда за разработка
$ grunt dev

# стартиране на тестовете на кода
$ karma start
```

Проекта трябва да се стартира под **locahost**. Бърз начин да се постигне това е чрез [XAMPP](https://www.apachefriends.org/index.html), [WAMP](http://www.wampserver.com/en/) или [http-server](https://www.npmjs.com/package/http-server).
