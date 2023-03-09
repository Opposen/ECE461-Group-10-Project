import { Octokit } from "@octokit/core";

export async function getLicense(owner: string, repo: string) : Promise<any> {
    // bearer token is process.env.GITHUB_TOKEN
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    try {
        // https://docs.github.com/en/graphql/reference/objects#license
        // get the spdx_id of the license with graphql
        const response = await octokit.graphql(
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
                owner,
                repo,
            }
        );          
        return response;
    } catch (error) {
        // console.error(error);
        throw error;
    }
}