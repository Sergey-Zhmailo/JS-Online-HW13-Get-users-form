class Http {
    constructor () {
        this.http = new XMLHttpRequest();
    }

    get(url, callback) {
        this.http.open("GET", url);
        const self = this;
        this.http.addEventListener("load", function () {
            if (self.http.status === 200) {
                callback(null, self.http.responseText);
            } else {
                callback(`Error: ${self.http.status}`, null);
            }
        });

        this.http.send();
    }
}

const ul = document.querySelector('.users-list');
const getUsersButton = document.querySelector('.get-users');
const info = document.querySelector('.info');

ul.addEventListener("click", function (e) {
   if (e.target.classList.contains('user-name')) {
       const ui = new UI();
       id = e.target.id - 1;
       ui.showDetails(usersList[id]);
   }
});

class UI {
    addToList(user) {
        // Create markup
        let name = user.name;
        let id = user.id;
        let li = `<li id="${id}" class="user-name">${name}</li>`;
        ul.insertAdjacentHTML('beforeend', li);
    }
    showDetails(user) {
        let name = user.username;
        let email = user.email;
        let website = user.website;
        info.innerHTML = ``;
        let spanInfo = `<div class="info-message"><span>Name: ${name}</span><span>Email: ${email}</span><span>Website: ${website}</span><button class="close-details">X</button></div>`;
        info.insertAdjacentHTML('beforeend', spanInfo);
        let closeDetailsButton = document.querySelector('.close-details');
        closeDetailsButton.addEventListener("click", function () {
            info.innerHTML = ``;
        });
    }
}

const http = new Http();
let usersList = [];
getUsersButton.addEventListener("click", function () {
    http.get("https://jsonplaceholder.typicode.com/users", function (err, res) {
        usersList = JSON.parse(res);
        const ui = new UI();
        ul.innerHTML = ``;
        usersList.forEach(user => ui.addToList(user));
    });
});

