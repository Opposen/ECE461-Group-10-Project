Object.defineProperty(exports, "__esModule", { value: true });

const User = exports.User;
const UserDatabase = exports.UserDatabase;

localStorage.clear();

/**
 * loads any file in without fs
 * @param {*} filePath 
 * @returns contents of file
 */
function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
        result = xmlhttp.responseText;
    }
    return result;
}

/**
 * gets contents of user storing file, converts to string
 * @param {*} path to user file
 * @returns each line of file as string
 */
function get_users(path) {
    const file_data = loadFile(path);
    const file_lines = file_data.split('\n');
    return file_lines;
}

/**
 * check if requirements met to login, give failure message to page if not met
 * @param {*} event 
 */
function login_checks(event) {
    const errorElement = document.getElementById("error");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    let messages = [];
    if (username.value === "" || username.value === null) {
        messages.push("Username is required");
    } else if (password.value.length < 5) {
        messages.push("Password should be at least 5 characters");
    } else if(username.value === null || password.value === null) {
        messages.push("Null username and password");
    } else if (!database.can_login(username.value, password.value)) {
        messages.push("Incorrect username or password");
    }

    // if there is a message, login did not succeed
    if (messages.length > 0) {
        event.preventDefault();
        errorElement.innerText = messages.join(",");
    } else {
        localStorage.setItem("isAdmin", username.value=="ece30861defaultadminuser");
        event.preventDefault();
        window.location.href = "search/try.html";
    }
    
}

// Read in file lines
const file_lines = get_users("user_list.txt")

// create database from users read in, also add admin
var database = new UserDatabase([]); // Create database, create admin but don't add
const adminUser = new User('ece30861defaultadminuser','correcthorsebatterystaple123(!__+@**(A’”`;DROP TABLE packages;',true)
database.addUser(adminUser);
for(const line of file_lines) {
    var user_vals = line.split(" ")
    database.addUser(new User(user_vals[0], user_vals[1], false));
}

// get page info, attatch login logic to login button
const form = document.getElementById("form");
if(form != null) {
    form.addEventListener("submit", login_checks);
}