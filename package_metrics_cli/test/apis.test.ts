import { describe, expect, jest, test, beforeEach, afterEach } from '@jest/globals';
import { getCommits } from '../src/api/getCommits';
import { getCommunityProfile } from '../src/api/getCommunityProfile';
import { getContributors } from '../src/api/getContributors';
import { getIssues } from '../src/api/getIssues';
import { getLicense } from '../src/api/getLicense';
import { getReadme } from '../src/api/getReadme';
import { testCommunityProfile, testCommits, testContributors, testIssues, testLicense, testReadme } from './sampleResponses';

const mockRequest = jest.fn();
const error = jest.spyOn(console, 'error').mockImplementation(() => { });

jest.mock('@octokit/core', () => {
    return {
        Octokit: jest.fn().mockImplementation(() => {
            return {
                request: mockRequest,
            };
        }),
    };
})

afterEach(() => {
    jest.clearAllMocks();
});

describe('commit api', () => {
    mockRequest.mockReturnValueOnce(testCommits);

    test('gets and returns community profile', async () => {
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

    test('gets and returns community profile', async () => {
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
