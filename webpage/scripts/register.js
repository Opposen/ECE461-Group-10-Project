function handleRegisterSubmit(event) {
    var errorElement = document.getElementById("error");
    var username = (document.getElementById("username"));
    var password = (document.getElementById("password"));
    var messages = [];
    if (username.value === '' || username.value === null) {
        messages.push('Username is required');
    }
    if (password.value.length < 5) {
        messages.push('Password should be at least 5 chacaters');
    }
    if (messages.length > 0) {
        event.preventDefault();
    } else {
        errorElement.innerText = messages.join(',');
        event.preventDefault();
        window.location.href = "mainMenu.html";
    }
}
var form_R = document.getElementById("form-R");
form_R.addEventListener("submit", handleRegisterSubmit);