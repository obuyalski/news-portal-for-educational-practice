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

    return {
        getArticles: getArticles
    }

}());