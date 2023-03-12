import {User, UserDatabase} from '../src/user/user';
import { describe, expect, jest, test, beforeEach, afterEach } from '@jest/globals';

describe('User tests', () => {
    var database:UserDatabase = new UserDatabase([]); // Create database, create admin but don't add
    var adminUser:User = new User('ece30861defaultadminuser','correcthorsebatterystaple123(!__+@**(A’”`;DROP TABLE packages;',true)
    
    test('Add admin',  () => {
        database.addUser(adminUser); // check that adding admin succeeds
        expect(database.user_list[0].name).toBe('ece30861defaultadminuser');
    });

    test('Add other users',  () => {
        // Add 4 non-admin users, last user added should be last in list
        database.addUser(new User('User1','These',false));
        database.addUser(new User('User2','are',false));
        database.addUser(new User('User3','bad',false));
        database.addUser(new User('User4','passwords',false));
        expect(database.user_list[4].password).toBe('passwords');
    });

    test('Add existing user',  () => {
        // adding existing user must fail, check only 5 users in total
        expect(database.addUser(new User('User3','bad',false))).toBeFalsy(); 
        expect(database.user_list.length).toBe(5); 
    });


    test('Reset database',  () => {
        database.reset();
        expect(database.user_list[0].name).toBe('ece30861defaultadminuser'); // admin should remain
        expect(database.user_list[1]).toBeUndefined(); // no other user should be in list
    });
});

