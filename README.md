### Installation
```
yarn
```

### Run tests
**Unit**
```
yarn test
```

**Hermione**
```
yarn test:hermione
```
> Для запуска Гермионы не через плагин, запускайте сервер с помощью 
> 
> ``yarn start:test-server``

---
У меня написан свой плагин для Гермионы, который собирает проект, запускает его,
запускает селениум и стартует тесты. Лежит в папке `./plugins/selenium-runner.js`

---

При интеграционных тестах у меня часто возникала ошибка:

> Request failed with status 500 due to move target out of bounds: move target out of bounds

Пытался пофиксить ее перебирая параметры и меняя браузеры, 
но исправить так и не получилось, поэтому тесты могут падать (Win 11).
