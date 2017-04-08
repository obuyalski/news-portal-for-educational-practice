let articleModel = (function () {

    let oReq = new XMLHttpRequest();

    function getArticles(params, callback) {
        let skip = params.skip || 0;
        let top = params.top || 10;
        let filterConfig = params.filterConfig || {};

        function handler() {
            let articles = JSON.parse(this.responseText);

            callback({status: this.status, statusText: this.statusText}, articles);
            oReq.removeEventListener('load', handler);
        }

        oReq.addEventListener('load', handler);

        oReq.open('GET', buildQuery());
        oReq.send();

        function buildQuery() {
            return '/articles?skip=' + skip + '&top=' + top
                + Object.keys(filterConfig).reduce((result, key) => result += '&' + key + '=' + filterConfig[key], '');
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

            callback({status: this.status, statusText: this.statusText}, article);
            oReq.removeEventListener('load', handler);
        }

        oReq.addEventListener('load', handler);

        oReq.open('POST', '/article');
        oReq.setRequestHeader('content-type', 'application/json');
        oReq.send(JSON.stringify({article: article}));

    }

    function validateArticle(article) {
        // TODO: handle alien symbols like dots, commas and ect in article
        return !!article && isValidString(article.title, 100) &&
            isValidString(article.summary, 200) &&
            isValidString(article.content, 2000) &&
            (!!article.tags) &&
            (article.tags.every((tag) => !!tag));
    }

    function isValidString(string, maxLength) {
        return !!string && string.length > 0 && string.length <= maxLength;
    }

    function removeArticleById(id, callback) {

        function handler() {
            let article = JSON.parse(this.responseText);

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

        if (!validateArticle(article)) {
            callback({status: 500, statusText: 'Article is not valid'}, article);
            return;
        }

        function handler() {
            let article = JSON.parse(this.responseText);

            callback({status: this.status, statusText: this.statusText}, article);
            oReq.removeEventListener('load', handler);
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