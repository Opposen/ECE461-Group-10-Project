import { Octokit } from "@octokit/core";
import { communityProfileResponse } from "./types";

export async function getCommunityProfile(owner: string, repo: string) : Promise<communityProfileResponse> {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    try {
        const profile = await octokit.request('GET /repos/{owner}/{repo}/community/profile', {
            owner,
            repo,
        });
        return profile;
    } catch (error) {
        console.error(error);
        throw error;
    }
}