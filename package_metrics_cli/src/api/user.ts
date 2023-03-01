
export class UserDatabase {
    user_list:User[];

    constructor(user_list:User[]) {
        this.user_list = user_list
    }

    reset() {
        
    }
}

export class User {
    name: string;
    password: string;
    admin_flag: boolean;

    constructor(name: string, password: string, admin_flag: boolean) {
        this.name = name;
        this.password = password;
        this.admin_flag = admin_flag;
    }
}