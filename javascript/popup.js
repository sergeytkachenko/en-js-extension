
function auth() {
    var login = document.getElementById("login").value,
        password = document.getElementById("password").value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (data) {
        if(!data.currentTarget.response) {
            return;
        }
        data = JSON.parse(data.currentTarget.response || "null");
        if(data.success) {
            localStorage.setItem('userID', data.userID);
            authSuccess();
            return;
        }
        authError();
    }; // Implemented elsewhere.
    xhr.open("GET", 'http://english.stkachenko.org.ua/admin.json?login='+login+'&password='+password);
    xhr.send();
}

function logout() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (data) {
        if(!data.currentTarget.response) {
            return;
        }
        localStorage.removeItem('userID');
        logoutComp();
    }; // Implemented elsewhere.
    xhr.open("GET", 'http://english.stkachenko.org.ua/login/exit.json');
    xhr.send();
}

document.getElementById('auth').onclick = auth;
document.getElementById('logout').onclick = logout;

function authSuccess() {
    document.getElementById('autorisation').style.display = 'none';
    document.getElementById('auth-info').style.display = 'block';
}

function logoutComp () {
    document.getElementById('autorisation').style.display = 'block';
    document.getElementById('auth-info').style.display = 'none';
}

if(localStorage.getItem('userID')){
    authSuccess();
}