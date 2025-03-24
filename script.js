document.addEventListener("DOMContentLoaded", async () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const logoutBtn = document.getElementById("logout-btn");
    const deleteAccountBtn = document.getElementById("delete-account-btn");

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;
            const users = await getUsers();

            if (users.find(user => user.username === username)) {
                alert("Username already taken!");
                return;
            }

            users.push({ username, password });
            await updateUsers(users);
            localStorage.setItem("user", username);
            window.location.href = "home.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("login-username").value.trim();
            const password = document.getElementById("login-password").value;
            const users = await getUsers();
            const user = users.find(user => user.username === username && user.password === password);

            if (!user) {
                alert("Invalid credentials!");
                return;
            }

            localStorage.setItem("user", username);
            window.location.href = "home.html";
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
    }

    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener("click", async () => {
            const username = localStorage.getItem("user");
            let users = await getUsers();
            users = users.filter(user => user.username !== username);
            await updateUsers(users);
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
    }

    // Display Username on Homepage
    const user = localStorage.getItem("user");
    if (user) {
        document.getElementById("user-name").textContent = user;
        document.getElementById("username-display").textContent = user;
        document.getElementById("auth-link").textContent = user;
    }
});
