let articleModel = (function () {

    let GLOBAL_ARTICLES = [];

    let oReq = new XMLHttpRequest();

    function getArticles(params, callback) {
        let skip = params.skip || 0;
        let top = params.top || 10;

        function handler() {
            let articles = JSON.parse(this.responseText);
            GLOBAL_ARTICLES.push(articles);

            callback({status: this.status, statusText: this.statusText}, articles);
            oReq.removeEventListener('load', handler);
        }

        oReq.addEventListener('load', handler);

        oReq.open('GET', buildQuery());
        oReq.send();

        function buildQuery() {
            return '/articles?skip=' + skip + '&top=' + top;
        }
    }

    function addArticle(article, callback) {

        if (!validateArticle(article)) {
            callback({status: 500, statusText: 'Article is not valid'}, article);
            return;
        }

        article['author'] = USERNAME;

        function handler() {
            let article = JSON.parse(this.responseText);
            GLOBAL_ARTICLES.unshift(article);

            callback({status: this.status, statusText: this.statusText}, article);
            oReq.removeEventListener('load', handler);
        }

        oReq.addEventListener('load', handler);

        oReq.open('POST', '/article');
        oReq.setRequestHeader('content-type', 'application/json');
        oReq.send(JSON.stringify({article: article}));

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

    function removeArticleById(id, callback) {

        function handler() {
            let article = JSON.parse(this.responseText);
            GLOBAL_ARTICLES.unshift(article);

            callback({status: this.status, statusText: this.statusText}, article);
            oReq.removeEventListener('load', handler);
        }

        oReq.addEventListener('load', handler);

        oReq.open('DELETE', buildQuery());
        oReq.send();

        function buildQuery() {
            return '/article?id=' + id;
        }
    }

    function getArticleById(id, callback) {
        function handler() {
            let article = JSON.parse(this.responseText);

            callback({status: this.status, statusText: this.statusText}, article);
            oReq.removeEventListener('load', handler);
        }

        oReq.addEventListener('load', handler);

        oReq.open('GET', buildQuery());
        oReq.send();

        function buildQuery() {
            return '/article?id=' + id;
        }
    }

    function editArticle(article, callback) {
        function handler() {
            let article = JSON.parse(this.responseText);
            let articleArray = GLOBAL_ARTICLES.filter((article) => article.id === id);
            replaceArticle(articleArray[0], article);

            callback({status: this.status, statusText: this.statusText}, article);
            oReq.removeEventListener('load', handler);

            function replaceArticle(oldArticle, newArticle) {
                Object.keys(newArticle).forEach((key) => oldArticle[key] = newArticle[key]);
            }
        }

        oReq.addEventListener('load', handler);

        oReq.open('PUT', buildQuery());
        oReq.setRequestHeader('content-type', 'application/json');
        oReq.send(JSON.stringify({article: article}));

        function buildQuery() {
            return '/article?id=' + article.id;
        }
    }

    return {
        getArticles: getArticles,
        addArticle: addArticle,
        removeArticleById: removeArticleById,
        getArticleById: getArticleById,
        editArticle: editArticle
    }

}());