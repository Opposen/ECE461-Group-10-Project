import { UserDatabase, User } from "./user";
import { logToFile } from "../logging/logging";
import fs from 'fs';

// Check if user_list exists, create if it doesn't
if (!fs.existsSync("user_list.txt")) {
    fs.writeFile('user_list.txt', '',  function(err) {
        if (err) {
            return console.error(err);
        }
        logToFile(null, 1, "Created user_list");
    });
} 

// Read in user list
var file_lines: string[] = [];
fs.readFile('user_list.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    file_lines = data.toString().split("\n");
    //console.log("Asynchronous read: " + data.toString());
    logToFile(null, 2, "Read in users");
});

// Create database from users read in, also add admin
var database:UserDatabase = new UserDatabase([]); // Create database, create admin but don't add
const adminUser:User = new User('ece30861defaultadminuser','correcthorsebatterystaple123(!__+@**(A’”`;DROP TABLE packages;',true)
database.addUser(adminUser);
for(const line of file_lines) {
    var user_vals = line.split(" ")
    database.addUser(new User(user_vals[0], user_vals[1], false));
}

export function can_login(given_username:string, given_password:string) {
    //if (document == null) {
    //    return false
    //}

    var username = document.getElementById("username") as HTMLFormElement;
    var password = document.getElementById("password") as HTMLFormElement;

    if(username.value === null || password.value === null) {
        return false;
    }

    if (database.can_login(username.value, password.value)) {
        logToFile(null, 2, "Successful login");
        return true;
    }
    logToFile(null, 2, "Failed login");
    return false;
}
//if () {

//}