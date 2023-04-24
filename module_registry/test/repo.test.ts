import { describe, expect, jest, test, beforeEach, afterEach } from '@jest/globals';
import { read } from 'fs';
import { PackageDatabase, Repository, History, create_repo_from_url} from '../src/api/repo'
import { logToFile } from '../src/logging/logging';

afterEach(() => {
    jest.clearAllMocks();
});


describe('Repository Unit Tests', () => {
    let repo:Repository;

    test('Check attributes', () => {
        repo = new Repository("repo1", "owner", "url", "1.0", 10, []);
        expect(repo.name).toBe("repo1")
        expect(repo.current_version).toBe("1.0")
        expect(repo.size).toBe(10)
        expect(repo.history_list).not.toBeNull()
    });

    test('Add to history', () => {
        repo.add_history(new History("Download", "1.0", "ece30861defaultadminuser"))
        expect(repo.history_list[0].username).toBe("ece30861defaultadminuser")
    });

    test('Create using url', async () => {
        const url_repo = await create_repo_from_url("https://github.com/lodash/lodash");

        expect(url_repo.name).toBe("lodash")
        expect(url_repo.owner).toBe("lodash")
        expect(url_repo.current_version).toBe("1.0")
    });

    
});


describe('Package Database Unit Tests', () => {
    let package_database:PackageDatabase;

    test('Create database, check constructor', () => {
        package_database = new PackageDatabase([], "");
        expect(package_database.repository_list).not.toBeNull();
    });

    test('Add repositories', () => {
        package_database.addPackage(new Repository("repo1", "owner", "url", "1.0", 10, []))
        package_database.addPackage(new Repository("repo2", "owner", "url", "1.1", 20, []))
        package_database.addPackage(new Repository("repo3", "owner", "url","2.0", 5, []))
        package_database.addPackage(new Repository("repo4", "owner", "url","0.5", 3, []))
        expect(package_database.repository_list.length).toBe(4);
    });

    // TO BE IMPLEMENTED
    test('Get contents test', () => {
        expect(package_database.get_contents_of("repo1")).toBe(-1);
    });

});


jest.setTimeout(240000); // Extend timeout for readme readin
describe('Repo Api Integration Tests', () => {

    test('Get Readme', async () => {
        let repo = new Repository("lodash", "lodash", "https://github.com/lodash/lodash", "1.0", 10, []);
        let readme_response = await repo.get_readme();
        let readme_text = Buffer.from(readme_response.data.content, "base64").toString("ascii");
        //logToFile(readme_text.substring(0,50), 0, "First 50 chars of lodash readme");
        expect(readme_text.substring(10,37)).toBe("[Site](https://lodash.com/)")
    });

    test('Review Metric', async () => {
        // Some pull requests are reviewed, so should not be 0
        let repo = await create_repo_from_url("https://www.npmjs.com/package/browserify");
        let metric = await repo.review_metric();
        logToFile(metric, 0, "browserify review metric");
        expect(Math.round(metric*100)/100).not.toBe(0)

        // No pull requests yet have been reviewed, so should be less than 1
        repo = await create_repo_from_url("https://github.com/lodash/lodash");
        metric = await repo.review_metric();
        logToFile(metric, 0, "lodash review metric");
        expect(Math.round(metric*100)/100).not.toBe(1)
    });

    test('Get Rating on Github Repo', async () => {
        let repo = await create_repo_from_url("https://github.com/lodash/lodash");
        let rating = await repo.get_rating();
        logToFile(rating, 0, "lodash rating");
        expect(Math.round(rating*100)/100).not.toBe(-1);
    });

    test('Get Rating on NJPM Repo', async () => {
        let repo = await create_repo_from_url("https://www.npmjs.com/package/browserify");
        let rating = await repo.get_rating();
        logToFile(rating, 0, "browserify rating");
        expect(Math.round(rating*100)/100).not.toBe(-1);
    });
});


describe('Package Database Integration Tests', () => {
    let package_database:PackageDatabase;

    test('Create database', async () => {
        let repo1:Repository = await create_repo_from_url("https://github.com/lodash/lodash");
        let repo2:Repository = await create_repo_from_url("https://www.npmjs.com/package/browserify");
        package_database = new PackageDatabase([repo1, repo2], "");
        expect(package_database.repository_list).not.toBeNull();
    });

    test('Name Search', () => {
        let repo_list:Repository[] = package_database.search_by_name("browse");
        logToFile(repo_list[0].name, 2, "1st Name Search Result");
        expect(repo_list.length).toBe(1);
        expect(repo_list[0].name).toBe("browserify")
    });

    test('Regex Search', async () => {
        let regexp:RegExp = new RegExp("Iterating arrays, objects, & strings")
        let repo_list:Repository[] = await package_database.search_by_regex(regexp);
        logToFile(repo_list[0].name, 2, "1st Regex Search Result");
        expect(repo_list.length).toBe(1);
        expect(repo_list[0].name).toBe("lodash")

    });
});