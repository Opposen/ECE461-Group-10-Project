Object.defineProperty(exports, "__esModule", { value: true });

const User = exports.User;
const UserDatabase = exports.UserDatabase;

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

function get_users(path) {
    const file_data = loadFile(path);
    const file_lines = file_data.split('\n');
    return file_lines;
}


const file_lines = get_users("user_list.txt")
//logToFile(null, 2, "Read in users");


// Create database from users read in, also add admin
var database = new UserDatabase([]); // Create database, create admin but don't add
const adminUser = new User('ece30861defaultadminuser','correcthorsebatterystaple123(!__+@**(A’”`;DROP TABLE packages;',true)
database.addUser(adminUser);
for(const line of file_lines) {
    var user_vals = line.split(" ")
    database.addUser(new User(user_vals[0], user_vals[1], false));
}

function can_login(event) {
    const errorElement = document.getElementById("error");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    let messages = [];
    if (username.value === "" || username.value === null) {
        messages.push("Username is required");
    }
    else if (password.value.length < 5) {
        messages.push("Password should be at least 5 characters");
    }
    else if(username.value === null || password.value === null) {
        messages.push("Null username and password");
    }
    else if (!database.can_login(username.value, password.value)) {
        messages.push("Incorrect username or password");
        //logToFile(null, 2, "Successful login");
        //event.preventDefault();
        //window.location.href = "search/try.html";
    }// else {
        //logToFile(null, 2, "Failed login");
        //alert('Incorrect Username or Password!');
        
    //}

    if (messages.length > 0) {
        event.preventDefault();
        errorElement.innerText = messages.join(",");
    } else {
        event.preventDefault();
        window.location.href = "search/try.html";
    }
    
}


const form = document.getElementById("form");
if(form != null) {
    form.addEventListener("submit", can_login);
}