const userModel = (function () {
  const oReq = new XMLHttpRequest();

  function init() {
    checkUser()
      .then(initUser, window.console.log);
  }

  function initUser(user) {
    if (user) {
      document.querySelector('.dropbtn').innerHTML = user.username;
      document.querySelector('.logout-link').style.display = 'none';
      document.querySelector('.fa-pencil-square-o').style.display = 'block';
      document.querySelector('.fa-sign-in').style.display = 'block';
      document.querySelector('.logout-link').style.display = 'none';
      articleRenderer.showBtnChevron();
    } else {
      document.querySelector('.fa-pencil-square-o').style.display = 'none';
      document.querySelector('.fa-sign-in').style.display = 'none';
      document.querySelector('.logout-link').style.display = 'block';
    }
  }

  function checkUser() {
    return new Promise((resolve, reject) => {
      oReq.open('GET', '/user', true);
      oReq.onload = function () {
        if (this.status === 200) {
          const rt = this.responseText;
          const res = rt ? JSON.parse(rt) : null;
          resolve(res);
        }
      };
      oReq.onerror = function () {
        reject(`${this.status}, ${this.statusText}`);
      };
      oReq.send();
    });
  }

  function login(user) {
    return new Promise((resolve, reject) => {
      oReq.open('POST', '/login', true);
      oReq.setRequestHeader('content-type', 'application/json');
      oReq.onload = function () {
        if (this.status === 200) {
          const res = JSON.parse(this.responseText);
          if (res.user) {
            resolve(res.user);
          } else {
            reject(`${this.status}, ${this.statusText}`);
          }
        }
      };
      oReq.onerror = function () {
        reject(`${this.status}, ${this.statusText}`);
      };
      oReq.send(JSON.stringify(user));
    });
  }

  function logout() {
    return new Promise((resolve, reject) => {
      oReq.open('DELETE', '/logout', true);
      oReq.setRequestHeader('content-type', 'application/json');
      oReq.onload = function () {
        if (this.status === 200) {
          resolve();
        } else {
          reject(`${this.status}, ${this.statusText}`);
        }
      };
      oReq.onerror = function () {
        reject(`${this.status}, ${this.statusText}`);
      };
      oReq.send();
    });
  }


  return {
    login,
    logout,
    init
  };
}());
