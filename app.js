const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const articleRoutes = require('./private/article/articleRoutes');
const userRoutes = require('./private/user/userRoutes');
const articleModel = require('./private/article/articleModel');
const userModel = require('./private/user/userModel');

app.set('port', 3000);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/articles', articleRoutes.getArticles);
app.get('/article', articleRoutes.getArticlesById);
app.post('/article', articleRoutes.addArticle);
app.post('/user', userRoutes.addUser);
app.delete('/article', articleRoutes.removeArticle);
app.put('/article', articleRoutes.editArticle);

app.listen(app.get('port'), () => {

    articleModel.init();
    userModel.init();

    console.log('Example app listening on port 3000!');
});
