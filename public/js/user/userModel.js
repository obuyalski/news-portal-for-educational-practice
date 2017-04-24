let userModel = (function () {

    let oReq = new XMLHttpRequest();
    let username;

    function init() {
        if (localStorage.getItem('username')) {
            username = localStorage.getItem('username');
            document.querySelector('.dropbtn').innerHTML = username;
            document.querySelector('.logout-link').style.display = 'none';
            document.querySelector('.fa-pencil-square-o').style.display = 'block';
            document.querySelector('.fa-sign-in').style.display = 'block';
            document.querySelector('.logout-link').style.display = 'none';
        } else {
            document.querySelector('.fa-pencil-square-o').style.display = 'none';
            document.querySelector('.fa-sign-in').style.display = 'none';
            document.querySelector('.logout-link').style.display = 'block';
        }
    }

    function addUser(user) {
        return new Promise(function (resolve, reject) {
            oReq.open('POST', '/user', true);
            oReq.setRequestHeader('content-type', 'application/json');

            oReq.onload = function () {
                if (this.status === 200) {
                    let user = JSON.parse(this.responseText);
                    resolve(user);
                }
            };
            oReq.onerror = function () {
                reject(this.status + ' ' + this.statusText);
            };

            oReq.send(JSON.stringify({user: user}));

        });
    }

    return {
        addUser: addUser,
        init: init
    }

}());
