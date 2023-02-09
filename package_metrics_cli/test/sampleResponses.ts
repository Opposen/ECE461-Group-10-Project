import { communityProfileResponse, readmeResponse } from "../src/api/types";

export const testCommunityProfile: communityProfileResponse = {
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
};
