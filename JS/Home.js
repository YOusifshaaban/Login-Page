"use strict";
document.addEventListener('DOMContentLoaded', function () {
    let currentUserId = localStorage.getItem('currentUserId');
    if (!currentUserId) {
        window.location.href = 'login.html';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.id == currentUserId);

    if (!user || !user.username || !user.email || !user.avatar) {
        window.location.href = 'login.html';
        return;
    }

    if (user) {
        document.getElementById('userName').textContent = user.username;

        const img = document.getElementById('welcomeImage');
        img.src = user.avatar;
        img.alt = 'Profile Image';
    }
    else {
        window.location.href = 'login.html';
    }

    document.querySelector('#logoutButton').addEventListener('click', function () {
        localStorage.removeItem('currentUserId');
        window.location.href = 'login.html';
    });
});

