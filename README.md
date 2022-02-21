## [MosGeo](https://mosgeo.dora.team/) - наш сервис для визуализации спортивных объектов Москвы
> ### Как мы создавали проект, с которым вошли в топ-5 команд хакатона "Лидеры цифровой информации"
#### :earth_africa: Для создания чего-то нужна команда
Наш проект начинался с хакатона, и если вы имеете представление о том, что это, то вы понимаете, что одному там делать нечего. Нашли друзей/знакомых, имеющих опыт в проектной деятельности, которым было бы интересно дальнейшее развитие и идея создания чего-то нового, а не просто "сидеть на зарплате". Задача оказалась не самой сложной, мы быстро нашли ребят, которым была бы интересна данная тематика. 
#### :earth_africa: Все началось с идеи
Идея нашего проекта зародилась на хакатоне "Лидеры цифровой информации". Там нам было поставлено техническое задание - "Создать качественный инструмент, позволяющий обеспечить комплексный анализ спортивной инфраструктуры и помочь принять правильное решение по развитию спортивных объектов". Нам сразу же понравилась тематика задания и мы начали ее развивать. 

## О чем наш проект
#### :earth_africa: Проблема
По статистическим данным:
* В Москве активно функционируют 13,5 тысячи спортивных объектов;
* Более 4,5 миллиона москвичей систематически занимаются физкультурой и спортом;
* 135 тысяч москвичей являются действующими спортсменами.

Главная проблема всех этих объектов в их востребованности. По данным открытой статистики, более половины из них привлекают только людей, живущих в непосредственной близости от спортивного объекта (не более 500 метров).

![image](https://user-images.githubusercontent.com/98597996/151737746-6eef1a0a-22c4-4356-b0fe-38a417c4fbda.png)

#### :earth_africa: Решение
Самое главная задача сервиса - это аналитика расположения спортивных объектов в Москве. Сервис наглядно на карте отображает спортивные объекты с его назначением и кратким описанием. MosGeo позволяет собрать данные по определенному району (у какого количества населения есть спортивные объекты в пешей доступности, численность населения определенной зоны и количество спортивных объектов/площадок). С помощью методов машинного обучения сервис предлагает рекомендации по расположению новых спортивных объектов.  

## Реализация
#### :earth_africa: Работа с данными
В процессе создания сервиса мы изучили данные о спортивных объектах, предоставленные организаторами хакатона, а также использовали открытые данные о населении Москвы по районам.

#### :earth_africa: Визуализация: карты и графики
Имея в команде геоаналитика мы решили начать развивать наш проект именно с этой сферы.
>Геоаналитика - это полноценный инструмент для работы с пространственными данными

Имеющиеся инструменты мы использовали для визуализации и анализа данных, имеющих местоположение, для их лучшего понимания, принятия решений и прогнозирования. Для наглядности сервиса мы подключили карту Москвы.

![image](https://user-images.githubusercontent.com/98597996/151672202-7477b4a9-cae6-48b1-b6fd-e3a0dc87d26f.png)

После аналитики расположения спортивных объектов мы занялись визуализацией статистических данных и добавили в наш сервис наглядную статистику по населению, объектам и специфике спортивных объектов.

![image](https://user-images.githubusercontent.com/98597996/151730927-6651217c-c9a0-4299-8720-cb2ab6ce0f5e.png)

#### :earth_africa: Машинное обучение
На основе алгоритмов машинного обучения мы добавили в наш сервис "Рекомендации". Именно эта функция в сервисе и закрывает ключевую задачу хакатона - "Помочь принять правильное решение по развитию спортивных объектов".   
Для помощи в принятии решения по построению новых спортивных объектов используется алгоритм k-means для кластеризации спортивных объектов и расчета информации по ним. Дополнительно для построения рекомендации используются матричные преобразования.
Оптимальное число классов определяется методом Elbow Rule.

## Технологии
Для быстрого и удобного развертывания проекта используется docker-compose. Проект поделен на 4 сервиса: nginx, backend, frontend, postgis. Каждый сервис - это отдельный docker контейнер.  
  В рамках хакатона все 4 сервиса имеют свои конфигурационные файлы непосредственно в одной директории для более быстрого развертывания. В будущем все 4 сервиса можно разнести по разным серверам для более быстрой работы.
   
![image](https://user-images.githubusercontent.com/98597996/151670882-f35bb3c7-80f9-4071-9321-15e6f8258b0b.png)


#### Стек технологий
* Flask (Python);
* React;
* Docker;
* Nginx;
* PostGIS.

## Результат
Результатом работы нашей команды стал полностью рабочий онлайн сервис геоаналитики спортивных объектов Москвы, который позволяет обеспечить полноценный анализ спортивной инфраструктуры города и помочь с расположением новых объектов.   
Основными преимуществами нашего сервиса стали - быстродействие и наглядность. Именно это позволило нашей команде войти в топ-5 среди более 100 команд-участниц хакатона.
### [Презентация проекта](https://drive.google.com/file/d/1Q5YibfxzM2gRc-EpODAMlwQVZ-MZor3-/view?usp=sharing)

### [Сопроводительная документация](https://drive.google.com/file/d/1Rfv-QREsotfq8QPldo_IXB72lMVHSXn3/view?usp=sharing)

### [Документация Rest API](https://documenter.getpostman.com/view/3750020/UV5ahGNC)

---

### О нас

* <dora.team@gmail.com> - По вопросам сотрудничества 
* [Искахов Аскар](https://tlgg.ru/atletiks) - Руководитель проекта
* [Молокова Мария](https://tlgg.ru/nabor_bukovok) - Дизайнер, гео-аналитик
* [Рыбкин Георгий](https://tlgg.ru/goshka_rybkin) - Бэкенд-разработчик
* [Прокудин Виктор](https://tlgg.ru/Pr0kud1n) - Фронтенд-разработчик
* [Валеев Айнур](https://tlgg.ru/aim9800) - Аналитик
* [Алексеев Егор](https://tlgg.ru/maul415) - Проектный менеджер
