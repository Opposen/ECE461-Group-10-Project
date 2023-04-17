
function performSearch() {

}

function uploadFile() {

}

function admin_check(event) {
    
    let messages = [];

    // Check if user is an admin
    var isAdmin = Boolean(localStorage.getItem("isAdmin")=="true");
    if(!isAdmin) {
        console.log("fgqioewioubiu");
        messages.push("Requires admin status");
    }

    // if there is a message, admin check failed
    if (messages.length > 0) {
        event.preventDefault();
        errorElement.innerText = messages.join(",");
    } else {
        event.preventDefault();
        window.location.href = "register.html";
    }
}

// get page info, attach login logic to login button
const form = document.getElementById("form");
if(form != null) {
    form.addEventListener("submit", admin_check);
}