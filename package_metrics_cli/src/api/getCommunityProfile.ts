import { Octokit } from "@octokit/core";
import { communityProfileResponse } from "./types";

export async function getCommunityProfile(owner: string, repo: string): Promise<communityProfileResponse | null> {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    try {
        const profile = await octokit.request('GET /repos/{owner}/{repo}/community/profile', {
            owner,
            repo,
        });
        return profile;
    } catch (error: any) {
        // if the error is a 404, return null
        if (error.status === 404) {
            console.log(`404 error for ${owner}/${repo}`);
            return null;
        }
        console.log('non-404 error');
        // console.error(error);
        throw error;
    }
}