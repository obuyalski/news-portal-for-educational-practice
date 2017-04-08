const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const articleRoutes = require('./private/articleRoutes');
const articleModel = require('./private/articleModel');

app.set('port', 3000);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/articles', articleRoutes.getArticles);
app.get('/article', articleRoutes.getArticlesById);
app.post('/article', articleRoutes.addArticle);
app.delete('/article', articleRoutes.removeArticle);
app.put('/article', articleRoutes.editArticle);

app.listen(app.get('port'), () => {
    console.log('Example app listening on port 3000!');

    articleModel.init();
});

// TODO: 1. readMore button
// TODO: 2. login/logout + users database
// TODO: 3. articles database