import { Octokit } from "@octokit/core";

export async function getCommunityProfile(owner: string, repo: string) {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    try {
        const profile = await octokit.request('GET /repos/{owner}/{repo}/community/profile', {
            owner,
            repo,
        });
        return profile;
    } catch (error) {
        console.error(error);
        return error;
    }
}