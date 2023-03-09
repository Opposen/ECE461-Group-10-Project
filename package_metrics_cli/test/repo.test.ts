import { describe, expect, jest, test, beforeEach, afterEach } from '@jest/globals';
import { PackageDatabase, Repository, History} from '../src/api/repo'
import { logToFile } from '../src/logging/logging';

jest.mock('../src/logging/logging', () => {
    return {
        logToFile: jest.fn(),
    };
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Repository tests', () => {
    let repo:Repository;

    test('Check attributes', () => {
        repo = new Repository("repo1", "1.0", 10, 0, []);
        expect(repo.name).toBe("repo1")
        expect(repo.current_version).toBe("1.0")
        expect(repo.size).toBe(10)
        expect(repo.history_list).not.toBeNull()
    });

    test('Add to history', () => {
        repo.add_history(new History("Dowload", "1.0", "ece30861defaultadminuser"))
        expect(repo.history_list[0].username).toBe("ece30861defaultadminuser")
    });
});

describe('Package Database tests', () => {
    let package_database:PackageDatabase;

    test('Create database, check constructor', () => {
        package_database = new PackageDatabase([], "");
        expect(package_database.repository_list).not.toBeNull();
    });

    test('Add repositories', () => {
        package_database.addPackage(new Repository("repo1", "1.0", 10, 0, []))
        package_database.addPackage(new Repository("repo2", "1.1", 20, 0.5, []))
        package_database.addPackage(new Repository("repo3", "2.0", 5, 0, []))
        package_database.addPackage(new Repository("repo4", "0.5", 3, 1, []))
        expect(package_database.repository_list.length).toBe(4);
    });

    // TO BE IMPLEMENTED
    test('Get contents test', () => {
        expect(package_database.get_contents_of("repo1")).toBe(-1);
    });

});