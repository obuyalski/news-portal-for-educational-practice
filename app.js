const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', 3000);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

let GLOBAL_ARTICLES = [
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
    },

    {
        id: '22',
        title: 'sdfsd',
        image: 'https://retina.news.mail.ru/pic/f3/81/image29212892_cc52e749d9d7daf538810c7ba4aef26f.jpg',
        summary: 'sdfgrbeb',
        createdAt: new Date('2014-02-28T20:00:00'),
        author: 'Буяльский Олег',
        content: 'bbb',
        tags: ['Динамо']
    },
    {
        id: '23',
        title: 'sdf as dfsa f sasdfsd',
        image: 'https://retina.news.mail.ru/pic/f3/81/image29212892_cc52e749d9d7daf538810c7ba4aef26f.jpg',
        summary: 'sdfgrbeb         asdf dsa ',
        createdAt: new Date('2014-01-28T20:00:00'),
        author: 'Буяльский Олег',
        content: 'bbb d fssd sd fsd',
        tags: ['Динамо', 'DAS']
    }
];

app.get('/articles', (req, res) => {
    let skip = Number(req.query.skip);
    let top = Number(req.query.top);
    let filterConfig = {
        author: req.query.author || '',
        tags: (req.query.tags) ? req.query.tags.split(',') : [],
        createdAt: req.query.createdAt || ''
    };

    let articles = GLOBAL_ARTICLES.filter((article) => {
        return Object.keys(filterConfig).every((key) => {
            if (!filterConfig[key]) {
                return true;
            }
            if (Array.isArray(filterConfig[key])) {
                return filterConfig[key].every(tag => article[key].indexOf(tag) !== -1);
            } else {
                if (key === 'createdAt') {
                    return (new Date(filterConfig[key])).toDateString() === article[key].toDateString();
                } else {
                    return filterConfig[key] === article[key];
                }
            }
        })
    }).slice(skip, skip + top);

    res.json(articles);
});

app.get('/article', (req, res) => {
    let id = req.query.id;
    let article = GLOBAL_ARTICLES.filter((article) => article.id === id)[0];

    if (article) {
        res.json(article);
    } else {
        res.status(404);
        res.send('Article with id = ' + id + ' not found');
    }
});

app.post('/article', (req, res) => {
    let filledArticle = fillArticle(req.body.article);
    GLOBAL_ARTICLES.unshift(filledArticle);
    res.json(filledArticle);

    function fillArticle(article) {
        article.id = GLOBAL_ARTICLES.length + 1;
        article.createdAt = new Date();
        return article;
    }
});

app.delete('/article', (req, res) => {
    let id = req.query.id;
    let article = GLOBAL_ARTICLES.filter((article) => article.id === id)[0];

    if (article) {
        GLOBAL_ARTICLES.splice(GLOBAL_ARTICLES.indexOf(article), 1);
        res.json(article);
    } else {
        res.status(404);
        res.send('Article with id = ' + id + ' not found');
    }
});

app.put('/article', (req, res) => {
    let id = req.query.id;
    let article = req.body.article;
    let oldArticle = GLOBAL_ARTICLES.filter((article) => article.id === id)[0];

    if (oldArticle) {
        replaceArticle(oldArticle, article);
        res.json(oldArticle);
    } else {
        res.status(404);
        res.send('Article with id = ' + id + ' not found');
    }

    function replaceArticle(oldArticle, newArticle) {
        Object.keys(newArticle).forEach((key) => oldArticle[key] = newArticle[key]);
    }
});

app.listen(app.get('port'), () => {
    console.log('Example app listening on port 3000!');

    GLOBAL_ARTICLES.sort(function (article1, article2) {
        return article2.createdAt - article1.createdAt;
    });
});

// TODO: 2. pagination + filter
// TODO: 1. readMore button
// TODO: 4. login/logout + users database
// TODO: 3. articles database