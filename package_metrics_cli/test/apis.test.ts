import { describe, expect, jest, test, beforeEach, afterEach } from '@jest/globals';
//import { exec } from 'child_process';
import { cloneRepo, deleteClonedRepo, createTempFolder } from '../src/api/clone';
import { getCommits } from '../src/api/getCommits';
import { getCommunityProfile } from '../src/api/getCommunityProfile';
import { getContributors } from '../src/api/getContributors';
import { getIssues } from '../src/api/getIssues';
import { getLicense } from '../src/api/getLicense';
import { getReadme } from '../src/api/getReadme';
import { testCommunityProfile, testCommits, testContributors, testIssues, testLicense, testReadme } from './sampleResponses';
import {User, UserDatabase} from '../src/api/user';
import { logToFile } from '../src/logging/logging';


const mockRequest = jest.fn();
const error = jest.spyOn(console, 'error').mockImplementation(() => { });
const child_process = require('child_process');

jest.mock('child_process');

jest.mock('@octokit/core', () => {
    return {
        Octokit: jest.fn().mockImplementation(() => {
            return {
                request: mockRequest,
                graphql: mockRequest,
            };
        }),
    };
})

afterEach(() => {
    jest.clearAllMocks();
});

describe('clone tests', () => {
    let repoUrl: string = 'https://api.github.com/repos/octocat/Hello-World/';
    let testPath: string = './tmp/Hello-World';

    test('clones repo', async () => {
        child_process.exec.mockImplementationOnce((command: any, callback: any) => callback(null, { stdout: 'ok' }));
        await cloneRepo(repoUrl, testPath);
        expect(child_process.exec).toBeCalled();
    });

    test('cloneRepo handles error', async () => {
        child_process.exec.mockImplementationOnce((command: any, callback: any) => callback(new Error('response error'), new Error('response error')));
        await expect(cloneRepo(repoUrl, testPath)).rejects.toEqual(Error('response error'));
    });

    test('deletes repo', async () => {
        child_process.exec.mockImplementationOnce((command: any, callback: any) => callback(null, { stdout: 'ok' }));
        await deleteClonedRepo(testPath);
        expect(child_process.exec).toBeCalled();
    });

    test('deleteClonedRepo handles error', async () => {
        child_process.exec.mockImplementationOnce((command: any, callback: any) => callback(new Error('response error'), null));
        await expect(deleteClonedRepo(testPath)).rejects.toEqual(Error('response error'));
    });

    test('creates temp folder', async () => {
        child_process.exec.mockReturnValueOnce({ stdOut: '', stderr: '' });
        createTempFolder();
        expect(child_process.exec).toBeCalled();
    });

    test('createTempFolder handles error', async () => {
        child_process.exec.mockImplementation(() => {
            throw 'error';
        });
        try {
            createTempFolder();
        } catch (e) {
            expect(child_process.exec).toBeCalled();
            expect(e).toEqual("error");
        }
    });
});

describe('commits api', () => {
    mockRequest.mockReturnValueOnce(testCommits);

    test('gets and returns commits', async () => {
        await expect(getCommits('testOwner', 'testRepo')).resolves.toBe(testCommits);
        expect(mockRequest).toBeCalledWith(
            "GET /repos/{owner}/{repo}/commits",
            {
                "owner": "testOwner",
                "per_page": 100,
                "repo": "testRepo",
            }
        );
    });

    mockRequest.mockImplementationOnce(() => Promise.reject(new Error('response error')));

    test('logs error', async () => {
        await expect(getCommits('testOwner', 'testRepo')).rejects.toEqual(Error('response error'));
        expect(error).toBeCalledWith(Error('response error'));
    });
});

describe('community profile api', () => {
    mockRequest.mockReturnValueOnce(testCommunityProfile);

    test('gets and returns community profile', async () => {
        await expect(getCommunityProfile('testOwner', 'testRepo')).resolves.toBe(testCommunityProfile);
        expect(mockRequest).toBeCalledWith(
            "GET /repos/{owner}/{repo}/community/profile",
            {
                "owner": "testOwner",
                "repo": "testRepo",
            }
        );
    });

    mockRequest.mockImplementationOnce(() => Promise.reject(new Error('response error')));

    test('logs error', async () => {
        await expect(getCommunityProfile('testOwner', 'testRepo')).rejects.toEqual(Error('response error'));
        expect(error).toBeCalledWith(Error('response error'));
    });
});

describe('contributors api', () => {
    mockRequest.mockReturnValueOnce(testContributors);

    test('gets and returns contributors', async () => {
        await expect(getContributors('testOwner', 'testRepo')).resolves.toBe(testContributors);
        expect(mockRequest).toBeCalledWith(
            "GET /repos/{owner}/{repo}/contributors",
            {
                "owner": "testOwner",
                "per_page": 100,
                "repo": "testRepo",
            }
        );
    });

    mockRequest.mockImplementationOnce(() => Promise.reject(new Error('response error')));

    test('logs error', async () => {
        await expect(getContributors('testOwner', 'testRepo')).rejects.toEqual(Error('response error'));
        expect(error).toBeCalledWith(Error('response error'));
    });
});

describe('issues api', () => {
    mockRequest.mockReturnValueOnce(testIssues);

    test('gets and returns issues', async () => {
        await expect(getIssues('testOwner', 'testRepo')).resolves.toBe(testIssues);
        expect(mockRequest).toBeCalledWith(
            "GET /repos/{owner}/{repo}/issues",
            {
                "owner": "testOwner",
                "per_page": 100,
                "repo": "testRepo",
            }
        );
    });

    mockRequest.mockImplementationOnce(() => Promise.reject(new Error('response error')));

    test('logs error', async () => {
        await expect(getIssues('testOwner', 'testRepo')).rejects.toEqual(Error('response error'));
        expect(error).toBeCalledWith(Error('response error'));
    });
});

describe('license api', () => {
    mockRequest.mockReturnValueOnce(testLicense);

    test('gets and returns license', async () => {
        await expect(getLicense('testOwner', 'testRepo')).resolves.toBe(testLicense);
        expect(mockRequest).toBeCalledWith(
            `
                query getLicense($owner: String!, $repo: String!) {
                    repository(owner: $owner, name: $repo) {
                        licenseInfo {
                            spdxId,
                        }
                    }
                }
            `,
            {
                "owner": "testOwner",
                "repo": "testRepo"
            }
        );
    });

    mockRequest.mockImplementationOnce(() => Promise.reject(new Error('response error')));

    test('logs error', async () => {
        await expect(getLicense('testOwner', 'testRepo')).rejects.toEqual(Error('response error'));
        expect(error).toBeCalledWith(Error('response error'));
    });
});

describe('readme api', () => {
    mockRequest.mockReturnValueOnce(testReadme);

    test('gets and returns readme', async () => {
        await expect(getReadme('testOwner', 'testRepo')).resolves.toBe(testReadme);
        expect(mockRequest).toBeCalledWith(
            "GET /repos/{owner}/{repo}/readme",
            {
                "accept": "application/vnd.github+json",
                "owner": "testOwner",
                "repo": "testRepo",
            }
        );
    });

    mockRequest.mockImplementationOnce(() => Promise.reject(new Error('response error')));

    test('logs error', async () => {
        await expect(getReadme('testOwner', 'testRepo')).rejects.toEqual(Error('response error'));
        expect(error).toBeCalledWith(Error('response error'));
    });
});

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

