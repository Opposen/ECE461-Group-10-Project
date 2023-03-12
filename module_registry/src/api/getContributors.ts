import { Octokit } from "@octokit/core";
import { contributorsResponse } from "./types";

export async function getContributors(owner: string, repo: string): Promise<contributorsResponse> {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
            owner: owner,
            repo: repo,
            per_page: 100,
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}