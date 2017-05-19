const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const Store = require('connect-diskdb')(sessions);
const passport = require('./auth');

const articleRoutes = require('./private/article/articleRoutes');
const articleModel = require('./private/article/articleModel');
const userRoutes = require('./private/user/userRoutes');
const userModel = require('./private/user/userModel');

app.set('port', 3000);

app.use(express.static(`${__dirname}/public`));

const options = {
  path: './database',
  name: 'sessions'
};

const diskDBSessionStore = new Store(options);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
  secret: 'OlLg',
  resave: false,
  saveUninitialized: false,
  store: diskDBSessionStore
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/articles', articleRoutes.getArticles);
app.get('/article', articleRoutes.getArticlesById);
app.post('/article', articleRoutes.addArticle);
app.delete('/article', articleRoutes.removeArticle);
app.put('/article', articleRoutes.editArticle);
app.post('/login', userRoutes.login);
app.delete('/logout', userRoutes.logout);

app.get('/user', (req, res) => {
  const session = req.session;
  res.send(session.user);
});


app.listen(app.get('port'), () => {
  articleModel.init();
  userModel.init();
  console.log('Example app listening on port 3000!');
});
