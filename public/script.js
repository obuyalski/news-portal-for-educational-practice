'use strict';

var USERNAME = 'Буяльский Олег';
document.getElementsByClassName('dropbtn')[0].innerHTML = USERNAME;

var ADD_ARTICLE_BTN_INNER_TEXT = 'Опубликовать';
var EDIT_ARTICLE_BTN_INNER_TEXT = 'Отредактировать';

function editUsername(username) {
    document.getElementsByClassName('dropbtn')[0].innerHTML = username;
    USERNAME = username;
}

var tags = ['Динамо', 'Локомотив', 'Хоккей', 'Спорт', 'Шайба'];

var articleModel = (function () {

    var GLOBAL_ARTICLES = [
        {
            id: '1',
            title: 'Плату за ввоз товаров в упаковках для ИП сделают фиксированной',
            image: 'https://retina.news.mail.ru/pic/f3/81/image29212892_cc52e749d9d7daf538810c7ba4aef26f.jpg',
            summary: '27 марта, Минск /Корр. БЕЛТА/. Министерством жилищно-коммунального хозяйства подготовлен проект постановления Совета Министров',
            createdAt: new Date('2017-02-28T20:00:00'),
            author: 'Буяльский Олег',
            content: '27 марта, Минск /Корр. БЕЛТА/. Министерством жилищно-коммунального хозяйства подготовлен проект постановления Совета Министров «О внесении дополнений в постановление Совета Министров Республики Беларусь от 31 июля 2012 года № 708», который предусматривает установление фиксированного размера платы за ввоз товаров в полимерной, стеклянной, бумажной и (или) картонной упаковках, упаковке из комбинированных материалов для индивидуальных предпринимателей, являющихся плательщиками единого налога.',
            tags: ['Динамо']
        },
        {
            id: '2',
            title: '30 марта будут проблемы с byfly и ZALA в Минске',
            image: 'https://retina.news.mail.ru/pic/0c/fd/image29220678_8d4234d2def9f04c2e2edf7a2c7f90aa.jpg',
            summary: '8 часов назад, источник: Sputnik.by «Белтелеком»: 30 марта будут проблемы с byfly и ZALA в Минске',
            createdAt: new Date('2017-01-27T19:10:00'),
            author: 'Буяльский Олег',
            content: 'МИНСК, 27 мар — Sputnik. Минчане столкнутся с проблемами в работе ByFly, ZALA и услуг телефонии IMS в ночь на 30 марта, сообщили в РУП «Белтелеком».',
            tags: ['Локомотив', 'Спорт']

        },
        {
            id: '3',
            title: 'Оранжевый уровень опасности объявлен в Беларуси',
            image: 'https://retina.news.mail.ru/pic/a8/8e/image29214233_befdec6fd8a19803ab6d39128a3c4c59.jpg',
            summary: 'Оранжевый уровень опасности объявлен в Беларуси 28 марта из-за сильного ветра',
            createdAt: new Date('2017-01-27T23:00:00'),
            author: 'Буяльский Олег',
            content: 'Во вторник будет облачно с прояснениями. Ночью и утром по северо-восточной части страны пройдут кратковременные осадки (дождь, мокрый снег). Днем будет преимущественно без осадков. Ветер прогнозируется северо-западный 6−11 м/с, на большей части территории ожидаются порывы до 15−20 м/с.Температура воздуха ночью составит от нуля до плюс 6 градусов. Днем — 4−10 градусов выше нуля, по юго-западу — 11−15 градусов тепла.',
            tags: ['Хоккей', 'Динамо', 'Локомотив']
        },
        {
            id: '4',
            title: 'КГК выявил массовые нарушения в лесхозах Минской области',
            image: 'https://static.pexels.com/photos/1029/landscape-mountains-nature-clouds.jpg',
            summary: '8 часов назад, источник: Ежедневник.by КГК выявил массовые нарушения в лесхозах Минской области',
            createdAt: new Date('2016-12-27T23:10:00'),
            author: 'Соболев Иван',
            content: 'В Комитете государственного контроля Минской области состоялось выездное заседание коллегии, в ходе которого рассмотрены результаты контроля за деятельностью государственных лесохозяйственных учреждений региона. В ходе коллегии было отмечено, что в целом лесохозяйственные учреждения Минской области обеспечивают реализацию возложенной на них основной задачи по управлению, использованию, воспроизводству, охране и защите лесного фонда, выполняют доведенные отрасли показатели социально-экономического развития, сообщила ',
            tags: ['Динамо', 'Локомотив']
        },
        {
            id: '5',
            title: 'Штрафы для семейных агрессоров могут отменить',
            image: 'https://retina.news.mail.ru/pic/fe/b1/image29218918_4759d20dd56854ab90599a6d51db596d.jpg',
            summary: '11 часов назад, источник: БЕЛТА В Беларуси изучают возможность замены штрафов на коррекционные программы для семейных агрессоров',
            createdAt: new Date('2016-11-28T23:00:00'),
            author: 'Буяльский Олег',
            content: 'В Беларуси проводится большая работа по противодействию семейному насилию и на законодательном, и на практическом уровне. В настоящее время на профилактическом учете стоит уже почти 7 тыс. человек, с ними постоянно проводится работа как по месту жительства, так и с приглашением в органы внутренних дел. Только за последний год вынесено около 3 тыс. защитных предписаний',
            tags: ['Динамо', 'Локомотив', 'Хоккей']
        },
        {
            id: '6',
            title: 'Минчанин обокрал работодателя, не выплатившего ему зарплату',
            image: 'http://alp.org.ua/wp-content/uploads/2012/02/nature-wallpaper-1920x1080-082.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2016-10-27T20:10:00'),
            author: 'Соболев Сергей',
            content: 'Гости создали больше опасных моментов...',
            tags: ['Динамо', 'Локомотив']
        },
        {
            id: '7',
            title: 'Пенсионер провел сутки на озере в лодке в Петриковском р',
            image: 'http://alp.org.ua/wp-content/uploads/2012/02/nature-wallpaper-1920x1080-082.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2016-09-27T23:00:00'),
            author: 'Иванов Иван',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
            tags: ['Динамо', 'Хоккей']
        },
        {
            id: '8',
            title: 'На железной дороге в Эстонии произошла утечка химикатов',
            image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2016-08-27T23:00:00'),
            author: 'Буяльский Олег',
            content: 'Гости создали больше опасных моментов...',
            tags: ['Хоккей']
        },
        {
            id: '9',
            title: 'СКА повел со счетом 3-0 в финале Западной конференции КХЛ',
            image: 'http://www.wallpapereast.com/static/images/spring-in-nature-wide-wallpaper-603794.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2016-07-27T23:10:59'),
            author: 'Соболев Иван',
            content: 'Гости создали больше опасных моментов...',
            tags: ['Локомотив']
        },
        {
            id: '10',
            title: 'Немедленно разойтись: 6 автомобилей для разгона демонстраций',
            image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2016-06-27T23:09:50'),
            author: 'Ковалевский Иван',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
            tags: ['Динамо', 'Локомотив', 'Спорт']
        },
        {
            id: '11',
            title: 'Названа самая высокооплачиваемая актриса Голливуда',
            image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2016-02-27T23:00:00'),
            author: 'Буяльский Олег',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
            tags: ['Динамо']
        },
        {
            id: '12',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            image: 'http://www.viralnovelty.net/wp-content/uploads/2014/07/121.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2016-01-27T23:10:00'),
            author: 'Буяльский Олег',
            content: 'Гости создали больше опасных моментов...',
            tags: ['Локомотив']

        },
        {
            id: '13',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2016-01-20T23:00:00'),
            author: 'Буяльский Олег',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
            tags: ['Хоккей', 'Динамо', 'Локомотив']
        },
        {
            id: '14',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2015-12-27T23:10:00'),
            author: 'Соболев Иван',
            content: 'Гости создали больше опасных моментов...',
            tags: ['Динамо', 'Локомотив']
        },
        {
            id: '15',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2015-11-28T23:00:00'),
            author: 'Соболев Иван',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
            tags: ['Динамо', 'Локомотив', 'Шайба', 'Хоккей']
        },
        {
            id: '16',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2015-10-27T20:10:00'),
            author: 'Соболев Сергей',
            content: 'Гости создали больше опасных моментов...',
            tags: ['Динамо', 'Локомотив']
        },
        {
            id: '17',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2015-09-27T23:00:00'),
            author: 'Буяльский Олег',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
            tags: ['Динамо', 'Хоккей']
        },
        {
            id: '18',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2015-08-27T23:00:00'),
            author: 'Буяльский Олег',
            content: 'Гости создали больше опасных моментов...',
            tags: ['Хоккей']
        },
        {
            id: '19',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2015-07-27T23:10:59'),
            author: 'Буяльский Олег',
            content: 'Гости создали больше опасных моментов...',
            tags: ['Локомотив', 'Шайба']
        },
        {
            id: '20',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2015-06-27T23:09:50'),
            author: 'Буяльский Олег',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
            tags: ['Динамо', 'Локомотив']
        },
        {
            id: '21',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2014-11-28T23:00:00'),
            author: 'Буяльский Олег',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
            tags: ['Динамо', 'Локомотив', 'Шайба', 'Хоккей']
        }


    ];

    function newArticles() {
        GLOBAL_ARTICLES = JSON.parse(localStorage.getItem('articleData'));
        for (var i = 0; i < GLOBAL_ARTICLES.length; i++)
            GLOBAL_ARTICLES[i].createdAt = new Date(GLOBAL_ARTICLES[i].createdAt);
        tags = JSON.parse(localStorage.getItem('tags'));
    }


    function saveArticles() {
        localStorage.setItem('articleData', JSON.stringify(GLOBAL_ARTICLES));
    }
    function sortArticles() {
        GLOBAL_ARTICLES.sort(function (article1, article2) {
            return article2.createdAt - article1.createdAt;
        });
    }

    function getArticleById(id) {
        var articleIdx = GLOBAL_ARTICLES.map(function (article) {
            return article.id;
        }).indexOf(id);

        return (articleIdx !== -1) ? GLOBAL_ARTICLES[articleIdx] : -1;
    }

    function getArticles(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 10;

        if (!filterConfig) {
            return GLOBAL_ARTICLES.slice(skip, skip + top);
        } else {
            return GLOBAL_ARTICLES.filter(function (article) {
                return Object.keys(filterConfig).every(function (key) {

                        if (key === 'createdAt'){
                            var str = article[key];
                            filterConfig[key] = new Date(filterConfig[key]);
                            article[key] = new Date(article[key]);
                            if(filterConfig[key].toDateString() === article[key].toDateString())
                            return str;
                        }

                        else if (key === 'tags'){
                          return duplicat(filterConfig.tags, article.tags );
                        }

                    return filterConfig[key] === article[key];
                });
            }).slice(skip, skip + top);
        }
    }

    function addArticle(article) {
        if (validateArticle(article)) {
            article['id'] = GLOBAL_ARTICLES.length + 1 + '';
            article['createdAt'] = new Date();
            article['author'] = USERNAME;

            GLOBAL_ARTICLES.unshift(article);
            saveArticles();
            return article;
        } else {
            return undefined;
        }
    }

    function getArticlesCount() {
        return GLOBAL_ARTICLES.length;
    }

    function validateArticle(article) {
        return !!article && isValidString(article.title, 100) &&
            isValidString(article.summary, 200) &&
            isValidString(article.content, 2000) &&
            (!!article.tags);
    }

    function isValidString(string, maxLength) {
        return !!string && string.length > 0 && string.length <= maxLength;
    }

    function duplicat(b, c) {
        for (var d = [], e = {}, f = {}, a = 0; a < b.length; a++) e[b[a].toLowerCase()] = !0;
        for (a = 0; a < c.length; a++) f[c[a].toLowerCase()] = !0;
        for (var g in e) f[g] && d.push(g.toLowerCase());
        if (d.length === b.length) {
            return d;
        }
        else {
            return;
        }
    }

    function editArticle(id, articleConfig) {

        var article = getArticleById(id);
        var copyArticle = {};

        Object.keys(article).forEach(function (key) {
                copyArticle[key] = article[key];
            });

        if (article === -1) {
            return false;
        }

        Object.keys(articleConfig).forEach(function (key) {
            if (article[key] && isArticleKeyChangeable(key)) {
                article[key] = articleConfig[key];
            }
        });

        article['image'] = articleConfig.image;

        if(validateArticle(article)) {
            saveArticles();
            return article;
        }
        else{
            Object.keys(copyArticle).forEach(function (key) {
                    article[key] = copyArticle[key];
                    saveArticles();
                    return false;
            });
        }
    }

    function isArticleKeyChangeable(key) {
        return (key !== 'author' && key !== 'createdAt' && key !== 'id');
    }

    function addTag(tag) {
        var isTagInTags = tags.some(function (_tag) {
            return _tag.toLowerCase() === tag.toLowerCase();
        });

        if (!isTagInTags) {
            tags.push(tag);
        }

        return !isTagInTags;
    }

    function removeTag(tag) {
        var tagIdx = tags.map(function (tag) {
            return tag.toLowerCase();
        }).indexOf(tag.toLowerCase());

        if (tagIdx !== -1) {
            tags.splice(tagIdx, 1);
        }

        return tagIdx !== -1;
    }

    function removeArticleById(id) {
        var articleIdx = GLOBAL_ARTICLES.map(function (article) {
            return article.id;
        }).indexOf(id);

        if (articleIdx !== -1) {
            GLOBAL_ARTICLES.splice(articleIdx, 1);
        }

        saveArticles();
        return articleIdx !== -1;
    }

    function getGlobalArticles() {
        return GLOBAL_ARTICLES;
    }

    return {
        newArticles: newArticles,
        saveArticles: saveArticles,
        getArticles: getArticles,
        getArticleById: getArticleById,
        addArticle: addArticle,
        removeArticleById: removeArticleById,
        removeTag: removeTag,
        addTag: addTag,
        editArticle: editArticle,
        sortArticles: sortArticles,
        getGlobalArticles: getGlobalArticles,
        getArticlesCount: getArticlesCount
    };
}());

var articleRenderer = (function () {
    var ARTICLE_TEMPLATE;
    var ARTICLE_LIST_NODE;

    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
        ARTICLE_LIST_NODE = document.querySelector('.article-list');
    }

    function insertArticlesInDOM(articles) {
        var articlesNodes = renderArticles(articles);

        articlesNodes.forEach(function (node) {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function insertArticleInDOM(article) {
        var flag = true;
        var node = renderArticle(article, flag);
        ARTICLE_LIST_NODE.insertBefore(node, ARTICLE_LIST_NODE.childNodes[0]);
    }

    function removeArticlesFromDom() {
        ARTICLE_LIST_NODE.innerHTML = '';
    }


    function renderArticles(articles) {
        var flag = true;
        return articles.map(function (article) {
            return renderArticle(article, flag);
        });
    }

    function renderArticle(article) {
        var template = ARTICLE_TEMPLATE;

        template.content.querySelector('.article-list-item-tags').textContent = '';

        template.content.querySelector('.article-list-item').dataset.id = article.id;
        template.content.querySelector('.article-list-item-title').textContent = article.title;
        template.content.querySelector('.article-list-item-summary').textContent = article.summary;
        template.content.querySelector('.article-list-item-content').textContent = article.content;
        template.content.querySelector('#article-list-item-image').src = article.image;
        template.content.querySelector('.article-list-item-author').textContent = article.author;

        template.content.querySelector('.article-list-item-date').textContent = formatDate(article.createdAt);

        article.tags = unique(article.tags);
        var a = '';
        for (var i = 0; i < article.tags.length; i++) {
            a = document.createElement('a');
            a.className = 'article-list-item-tag';
            a.innerHTML = article.tags[i] + ' ';
            template.content.querySelector('.article-list-item-tags').appendChild(a);
        }

        if (article.author === USERNAME) {
            template.content.querySelector('.fa-chevron-down').style.display = 'inline-block';
        } else {
            template.content.querySelector('.fa-chevron-down').style.display = 'none';
        }
        return template.content.querySelector('.article-list-item').cloneNode(true);
    }

    function formatDate(d) {
        if (d === undefined)
            d = new Date();
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    }

    function unique(arr) {
        var obj = {};

        for (var i = 0; i < arr.length; i++) {
            var str = arr[i].toLowerCase();
            obj[str] = true;
        }

        return Object.keys(obj);
    }

    return {
        init: init,
        insertArticlesInDOM: insertArticlesInDOM,
        insertArticleInDOM: insertArticleInDOM,
        renderArticle: renderArticle,
        removeArticlesFromDom: removeArticlesFromDom
    };
}());

var pagination = (function () {
    var TOTAL;
    var PER_PAGE = 10;
    var CURRENT_PAGE = 1;
    var SHOW_MORE_BUTTON;
    var SHOW_MORE_CALLBACK;

    function init(total, showMoreCb) {
        TOTAL = total;
        SHOW_MORE_CALLBACK = showMoreCb;
        SHOW_MORE_BUTTON = document.querySelector('#pagination-show-more');
        SHOW_MORE_BUTTON.addEventListener('click', handleShowMoreClick)

        if (getTotalPages() <= CURRENT_PAGE) {
            hideShowMoreButton();
        }

        return getParams();
    }

    function handleShowMoreClick() {
        var paginationParams = nextPage();
        var filterConfig = articleActions.FillingFilterArticle();
        SHOW_MORE_CALLBACK(paginationParams.skip, paginationParams.top, filterConfig);
    }

    function getTotalPages() {
        return Math.ceil(TOTAL / PER_PAGE);
    }

    function nextPage() {
        CURRENT_PAGE++;
        if (getTotalPages() <= CURRENT_PAGE) {
            hideShowMoreButton();
        }

        return getParams();
    }

    function getParams() {
        return {
            top: PER_PAGE,
            skip: (CURRENT_PAGE - 1) * PER_PAGE
        };
    }

    function hideShowMoreButton() {
        SHOW_MORE_BUTTON.style.display = 'none';
    }

    return {
        init: init
    }

}());

var articleActions = (function () {

    var ARTICLE_LIST_NODE = document.querySelector('.article-list');
    var ADD_ARTICLE_NODE = document.querySelector('.fa-pencil-square-o');
    var SIGN_IN = document.querySelector('.fa-sign-in');
    var LOGOUT_LINK = document.querySelector('.logout-link');
    var SEARCH_BTN = document.querySelector('.filter-article-list');

    function init() {
        ARTICLE_LIST_NODE.addEventListener('click', handleArticleClick);
        ADD_ARTICLE_NODE.addEventListener('click', handleAddArticleClick);
        SIGN_IN.addEventListener('click', handleLogoutClick);
        LOGOUT_LINK.addEventListener('click', handleLogoutContainerClick);
        SEARCH_BTN.addEventListener('click', handleSearchByFilter);
    }

    function handleArticleClick(event) {

        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        if (event.target.classList.contains('edit-post')) {
            handleEditArticleAction(event.target.parentElement.parentElement.parentElement);
            return;
        }

        if (event.target.classList.contains('remove-post')) {
            handleRemoveArticleAction(event.target.parentElement.parentElement.parentElement);
            return;
        }

        if (event.target.classList.contains('read-more')) {
            handleReadMoreClick(event.target.parentElement.parentElement);
            return;
        }
    }

    function handleSearchByFilter() {
        var filterConfig = FillingFilterArticle();

        var filteredArticles = articleModel.getArticles(0, articleModel.getArticlesCount(), filterConfig);
        articleRenderer.removeArticlesFromDom();
        articleRenderer.init();

        var paginationParams = pagination.init(filteredArticles.length, renderArticles);
        renderArticles(paginationParams.skip, paginationParams.top, filterConfig);
    }

    function handleAddArticleClick() {
        modalBox.setCloseBtnInnerText(ADD_ARTICLE_BTN_INNER_TEXT);
        modalBox.open();
    }

    function handleEditArticleAction(article) {
        modalBox.setCloseBtnInnerText(EDIT_ARTICLE_BTN_INNER_TEXT);

        var a = articleModel.getArticleById(article.dataset.id);

        modalBox.openAndFillInputFields(a);
    }

    function handleLogoutContainerClick() {
        document.querySelector('.fa-chevron-down').style.display = 'none';
        document.querySelector('.logout-link').style.opacity = 0;
        document.querySelector('.logout_sign-in').style.display = 'block';
    }

    function handleReadMoreClick(article) {
        document.querySelector('.filter').style.display = 'none';
        document.querySelector('.article-list').style.display = 'none';
        document.querySelector('#pagination-show-more').style.display = 'none';
        document.querySelector('.display-news').style.display = 'block';

        var a = articleModel.getArticleById(article.dataset.id);

        FillingOutNewsForm(a);
    }

    function handleLogoutClick() {
        document.querySelector('.home').style.display = 'none';
        document.querySelector('.fa-pencil-square-o').style.display = 'none';
        document.querySelector('.search').style.display = 'none';
        document.querySelector('.dropbtn').style.display = 'none';
        document.querySelector('.fa-sign-in').style.display = 'none';
        document.querySelector('.fa-chevron-down').style.display = 'none';
        document.querySelector('.logout-link').style.display = 'block';
    }

    function handleRemoveArticleAction(articleNodeToDelete) {
        ARTICLE_LIST_NODE.removeChild(articleNodeToDelete);
        articleModel.removeArticleById(articleNodeToDelete.dataset.id);
    }

    function addArticle(article) {

        var filledArticle = articleModel.addArticle(article);

        if (filledArticle) {
            articleRenderer.insertArticleInDOM(article);
        }
    }

    function editArticle(article) {
        var editedArticle = articleModel.editArticle(article.id, article);
        var list = document.getElementsByClassName('article-list')[0];

        if (editedArticle) {
                    var renderEditArticle = articleRenderer.renderArticle(editedArticle, false);
                    ARTICLE_LIST_NODE.replaceChild(renderEditArticle, document.querySelector("[data-id='" + article.id + "']"));
        }
    }

    function FillingOutNewsForm(article){


        document.querySelector('.article-title').textContent = article.title;
        document.querySelector('.article-content').textContent = article.content;
        document.querySelector('#article-image').src = article.image;
        document.querySelector('.article-author').textContent = article.author;

        var a = '';
        for (var i = 0; i < article.tags.length; i++) {
            a = document.createElement('a');
            a.className = 'article-tag';
            a.innerHTML = article.tags[i] + ' ';
            document.querySelector('.article-tags').appendChild(a);
        }
    }

    function FillingFilterArticle() {

        var author = document.querySelector('.search-articles-by-author').value.replace(/\s+/, ' ');
        var tags = document.querySelector('.search-articles-by-tags').value.replace(/\s+/, ' ');
        var date = document.querySelector('.search-articles-by-date').value.replace(/\s+/, ' ');

        var filterConfig = {};

        if (author !== '' && author !== ' ') {
            filterConfig.author = author;
        }
        if (tags !== '' && tags !== ' ') {
            filterConfig.tags =  tags.split(/\s+/);
        }
        if (date !== '' && date !== ' ') {
            filterConfig.createdAt = date;
        }

        if(Object.keys(filterConfig).length === 0)
            return;

        return filterConfig;
    }

    return {
        init: init,
        addArticle: addArticle,
        editArticle: editArticle,
        FillingFilterArticle: FillingFilterArticle
    }
}());

var modalBox = (function () {

    var modal = document.getElementsByClassName('new-post')[0];
    var openBtn = document.getElementsByClassName('fa-pencil-square-o')[0];
    var closeBtn = document.querySelector('#btn-publish-article');
    var modalOverlay = document.querySelector('#modal-box-overlay');

    var isOpened;

    var currentEditedArticleId;

    function init() {
        closeBtn.addEventListener('click', close);

        isOpened = false;

        closeBtn.innerHTML = ADD_ARTICLE_BTN_INNER_TEXT;
    }

    function setCloseBtnInnerText(text) {
        closeBtn.innerHTML = text;
    }

    function getCloseBtnInnerText() {
        return closeBtn.innerHTML;
    }

    function open() {
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';
        openBtn.style.opacity = '0';

        isOpened = true;
    }

    function openAndFillInputFields(obj) {
        fillInputFields(obj);
        open();


        currentEditedArticleId = obj.id;
    }

    function close() {
        var article = {};

        if (getCloseBtnInnerText() === ADD_ARTICLE_BTN_INNER_TEXT) {
            article = prepareArticleFor('add', article);

            articleActions.addArticle(article);
        }

        if (getCloseBtnInnerText() === EDIT_ARTICLE_BTN_INNER_TEXT) {
            article = prepareArticleFor('edit', article);
            articleActions.editArticle(article);
        }

        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
        openBtn.style.opacity = '1';

        clearInputFields();

        isOpened = false;
    }

    function prepareArticleFor(mode, article) {
        article.title = document.querySelector('.news-title').value;
        article.image = document.querySelector('#news-img').value;
        article.summary = document.querySelector('.news-summary').value;
        article.content = document.querySelector('.news-content').value;
        article.tags = document.querySelector('.news-tags').value.split(/\s+/);

        if (mode === 'add') {
            article.author = USERNAME;
            article.createdAt = new Date();
        }

        if (mode === 'edit') {
            article.id = currentEditedArticleId + '';
        }

        return article;
    }

    function fillInputFields(obj) {
        document.querySelector('.news-title').value = obj.title;
        document.querySelector('#news-img').value = obj.image;
        document.querySelector('.news-summary').value = obj.summary;
        document.querySelector('.news-content').value = obj.content;
        document.querySelector('.news-tags').value = obj.tags.join(' ');
    }

    function clearInputFields() {
        document.querySelector('.news-title').value = '';
        document.querySelector('#news-img').value = '';
        document.querySelector('.news-summary').value = '';
        document.querySelector('.news-content').value = '';
        document.querySelector('.news-tags').value = '';
    }

    return {
        init: init,
        open: open,
        openAndFillInputFields: openAndFillInputFields,
        close: close,
        setCloseBtnInnerText: setCloseBtnInnerText,
        getCloseBtnInnerText: getCloseBtnInnerText
    }
}());

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {

    if(!localStorage.getItem('articleData'))
        articleModel.saveArticles();
    articleModel.newArticles();
    articleRenderer.init();

    var total = articleModel.getArticlesCount();
    var paginationParams = pagination.init(total, renderArticles);

    renderArticles(paginationParams.skip, paginationParams.top);

    modalBox.init();

    articleActions.init();

}

function renderArticles(skip, top, filterConfig) {

    articleModel.sortArticles();

    var articles = articleModel.getArticles(skip, top, filterConfig);

    articleRenderer.insertArticlesInDOM(articles);
}
