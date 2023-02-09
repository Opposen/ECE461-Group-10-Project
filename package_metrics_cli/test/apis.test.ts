import { describe, expect, jest, test, beforeEach, afterEach } from '@jest/globals';
import { cloneRepo, deleteClonedRepo, createTempFolder } from '../src/api/clone';
import { getCommits } from '../src/api/getCommits';
import { getCommunityProfile } from '../src/api/getCommunityProfile';
import { getContributors } from '../src/api/getContributors';
import { getIssues } from '../src/api/getIssues';
import { getLicense } from '../src/api/getLicense';
import { getReadme } from '../src/api/getReadme';
import { testCommunityProfile, testCommits, testContributors, testIssues, testLicense, testReadme } from './sampleResponses';

const mockRequest = jest.fn()
const error = jest.spyOn(console, 'error').mockImplementation(() => { });

jest.mock('@octokit/core', () => {
    return {
        Octokit: jest.fn().mockImplementation(() => {
            return {
                request: mockRequest,
            }
        }),
    };
})

const testCommunityProfile: communityProfileResponse = {
    headers: {
        "health_percentage": 0,
    },
    status: 200,
    url: 'https://api.github.com/repos/testOwner/testRepo/community/profile',
    data: {
        "health_percentage": 14,
        "description": null,
        "documentation": null,
        "files": {
            "code_of_conduct": null,
            "code_of_conduct_file": null,
            "contributing": null,
            "issue_template": null,
            "pull_request_template": null,
            "license": null,
            "readme": null,
        },
        "updated_at": null,
    }
}

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

    mockRequest.mockImplementationOnce(() => Promise.reject(new Error('response error')))

    test('logs error', async () => {
        await expect(getCommunityProfile('testOwner', 'testRepo')).rejects.toEqual(Error('response error'));
        expect(error).toBeCalledWith(Error('response error'));
    });
});
