export class PackageDatabase {

}

export class Repo {
    name: string;
    current_version: string;

    constructor(name:string, current_version:string) {
        this.name = name;
        this.current_version = current_version;
    }
}