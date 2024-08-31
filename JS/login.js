"use strict";
document.querySelector('.btn').addEventListener('click', function (event) {
    event.preventDefault();

    let email = document.querySelector('#loginEmail').value;
    let password = document.querySelector('#loginPassword').value;
    let loginError = document.querySelector('#loginError');

    loginError.textContent = '';

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.email === email);

    if (!user) {
        loginError.textContent = 'The email is incorrect';
        highlightError('#loginEmail');
    } 
    else if (user.password !== password) {
        loginError.textContent = 'The password is incorrect';
        highlightError('#loginPassword');
    } 
    else {

        removeErrorHighlight('#loginEmail');
        removeErrorHighlight('#loginPassword');

        localStorage.setItem('currentUserId', user.id);
        window.location.href = 'Home.html';
    }
});

function highlightError(selector) {
    let element = document.querySelector(selector);
    element.classList.add('error');
}

function removeErrorHighlight(selector) {
    let element = document.querySelector(selector);
    element.classList.remove('error');
}
