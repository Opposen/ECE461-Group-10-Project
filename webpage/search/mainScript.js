
function performSearch() {

}

function uploadFile() {

}

function admin_check(event) {
    if(!localStorage.getItem("isAdmin")) {
        messages.push("Requires admin status");
    }

    // if there is a message, login did not succeed
    if (messages.length > 0) {
        event.preventDefault();
        errorElement.innerText = messages.join(",");
    } else {
        event.preventDefault();
        window.location.href = "../addUser.html";
    }
}

// get page info, attach login logic to login button
const form = document.getElementById("form");
if(form != null) {
    form.addEventListener("adduser", admin_check);
}