let userModel = (function () {

    let oReq = new XMLHttpRequest();

    function addUser(user, callback) {

        function handler() {
            let user = JSON.parse(this.responseText);

            callback({status: this.status, statusText: this.statusText}, user);
            oReq.removeEventListener('load', handler);
        }

        oReq.addEventListener('load', handler);

        oReq.open('POST', '/user');
        oReq.setRequestHeader('content-type', 'application/json');
        oReq.send(JSON.stringify({user: user}));

    }
    function getUserByName(username, callback) {
        function handler() {
            let user = JSON.parse(this.responseText);

            callback({status: this.status, statusText: this.statusText}, user);
            oReq.removeEventListener('load', handler);
        }

        oReq.addEventListener('load', handler);

        oReq.open('GET', buildQuery());
        oReq.send();

        function buildQuery() {
            return '/user?username=' + username;
        }
    }



    return {
        addUser: addUser,
        getUserByName: getUserByName
    }

}());
