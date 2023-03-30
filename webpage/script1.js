function handleFormSubmit(event) {
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
        errorElement.innerText = messages.join(',');
    } else {
        event.preventDefault();
        window.location.href = "search/try.html";
    }
}
var form = document.getElementById("form");
form.addEventListener("submit", handleFormSubmit);