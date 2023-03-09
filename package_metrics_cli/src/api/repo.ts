export class PackageDatabase {
    repository_list:Repository[];
    package_directory_path:String;

    constructor(repository_list:Repository[], package_directory_path:String) {
        this.package_directory_path = package_directory_path;
        this.repository_list = repository_list;
    }

    /**
     * Collects package contents
     * @param package_name string name of package
     * @returns package contents in UNIMLEMENTED format, or null on failure
     */
    get_contents_of(package_name:String) {
        for(let repo of this.repository_list) {
            if(repo.name == package_name) {
                return repo.get_contents(this.package_directory_path);
            }
        }
        return null;
    }

    /**
     * Add new repo to the list, exclude if repo already exists
     * @param new_repo 
     * @returns {boolean} repo added or not
     */
    addPackage(new_repo:Repository) {
        for(let repo of this.repository_list) {
            if(repo.name == new_repo.name) {
                return false;
            }
        }
        this.repository_list.push(new_repo);
        return true;
    }

    // UNIMPLEMENTED
    updatePackage(name:String, new_version:String, new_contents:unknown) {
        return -1;
    }
}

export class Repository {
    name: String;
    current_version: String;
    size: Number;
    history_list: History[];

    constructor(name:String, current_version:String, size:Number, rating:Number, history_list:History[]) {
        this.name = name;
        this.current_version = current_version;
        this.size = size;
        this.history_list = history_list;
    }

    /**
     * Given a directory to pull from, find directory with same name and return contents
     * UNIMPLEMENTED
     * @param path Path to directory containing package
     * @returns Package contents OR success status, unsure of exact implementation
     */
    get_contents(path:String) {
        return -1;
    }

    /**
     * Adds history event to repo history
     * @param new_history 
     */
    add_history(new_history:History) {
        this.history_list.push(new_history);
    }

    /**
     * UNIMPLEMENTED
     * @returns {number} 0-1 representing weighted score
     */
    get_rating() {
        return -1;
    }
}

export class History {
    action: String;
    version: String;
    username: String
