function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        document.getElementById("error-message").innerText = "Please fill in all fields.";
        return false;
    }

    // Call backend API
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Login successful!");
                window.location.href = "/dashboard"; // Redirect to dashboard
            } else {
                document.getElementById("error-message").innerText = data.message;
            }
        })
        .catch(error => console.error('Error:', error));

    return false;
}

function handleSignUp(event) {
    event.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!email || !password) {
        document.getElementById("signup-error-message").innerText = "Please fill in all fields.";
        return false;
    }

    // Call backend API
    fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Sign up successful!");
                showLoginForm();
            } else {
                document.getElementById("signup-error-message").innerText = data.message;
            }
        })
        .catch(error => console.error('Error:', error));

    return false;
}

// ฟังก์ชันจำลองการ Log in ด้วย Google และ Apple
function handleGoogleLogin() {
    alert("Logging in with Google...");
    // Call Google API for authentication
}

function handleAppleLogin() {
    alert("Logging in with Apple...");
    // Call Apple API for authentication
}

// เพิ่ม Event Listener ให้ปุ่ม
document.querySelector('.google-login').addEventListener('click', handleGoogleLogin);
document.querySelector('.apple-login').addEventListener('click', handleAppleLogin);


function showSignUpForm() {
    document.querySelector(".login-container").style.display = "none";
    document.querySelector(".signup-container").style.display = "block";
}

function showLoginForm() {
    document.querySelector(".signup-container").style.display = "none";
    document.querySelector(".login-container").style.display = "block";
}
