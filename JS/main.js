"use strict";
document.querySelector('.btn.btn-warning.my-3').addEventListener('click', function (event) {
    event.preventDefault();

    let username = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let number = document.querySelector('#number').value;
    let avatarInput = document.querySelector('#avatar-input');
    let avatar = avatarInput.files[0];
    let registrationError = document.querySelector('#registrationError');
    // let MessageLink = document.querySelector("#MessageLink");
    // let number_remove = document.querySelector(".number-remove");
    // let user_remove = document.querySelector(".user_remove");
    // let img_remove = document.querySelector(".img_remove");

    registrationError.textContent = '';

    removeErrorHighlight('#username');
    removeErrorHighlight('#email');
    removeErrorHighlight('#password');
    removeErrorHighlight('#number');
    removeErrorHighlight('#avatar-input');

    let hasError = false;

    if (username.trim() === '') {
        registrationError.textContent = 'Please enter your username';
        highlightError('#username');
        hasError = true;
    }
    else if (!validateUsername(username)) {
        registrationError.textContent = 'Only English alphabet, number and whitespace are allowed';
        highlightError('#username');
        hasError = true;
    }

    else if (!validateEmail(email)) {
        registrationError.textContent = 'Please enter a valid email address';
        highlightError('#email');
        hasError = true;
    }
    else if (password.trim() === '') {
        registrationError.textContent = 'Please enter your password';
        highlightError('#password');
        hasError = true;
    }
    else if (!validatePassword(password)) {
        registrationError.textContent = 'Password must be at least 7 characters long and contain at least one number';
        highlightError('#password');
        hasError = true;
    }
    else if (number.trim() === '') {
        registrationError.textContent = 'Please enter your phone number';
        highlightError('#number');
        hasError = true;
    }
    else if (!validatePhoneNumber(number)) {
        registrationError.textContent = 'Please enter a valid 11 digits phone number that starts with 011, 012, 015, or 010';
        highlightError('#number');
        hasError = true;
    }
    else if (checkEmailExists(email)) {
        registrationError.textContent = 'This email is already registered';
        highlightError('#email');
        hasError = true;
    }
    else if (!avatar) {
        registrationError.textContent = 'Please add a profile picture';
        highlightError('#avatar-input');
        hasError = true;
    }

    if (!hasError) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let avatarBase64 = e.target.result;

            let userId = Date.now();

            let user = {
                id: userId,
                username: username,
                email: email,
                password: password,
                number: number,
                avatar: avatarBase64
            };

            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            localStorage.setItem('currentUserId', userId);

            window.location.href = 'Home.html';
        }
        reader.readAsDataURL(avatar);
    }
})
localStorage.clear();
function validateUsername(username) {
    let re = /^(?:[A-Za-z]+|\b[A-Za-z]+\b\s+[A-Za-z\s]*)$/;
    return re.test(username);
}

function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhoneNumber(number) {
    let re = /^(011|012|015|010)\d{8}$/;
    return re.test(number);
}

function checkEmailExists(email) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
}
function validatePassword(password) {
    let re = /^(?=.*\d)[A-Za-z\d]{7,}$/;
    return re.test(password);
}
function highlightError(selector) {
    let element = document.querySelector(selector);
    element.classList.add('error');
}

function removeErrorHighlight(selector) {
    let element = document.querySelector(selector);
    element.classList.remove('error');
}


