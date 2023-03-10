import { Octokit } from "@octokit/core";
import { commitsResponse } from "./types";

export async function getCommits(owner: string, repo: string) : Promise<commitsResponse> {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
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