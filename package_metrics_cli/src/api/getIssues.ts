import { Octokit } from "@octokit/core";
import { issuesResponse } from "./types";

export async function getIssues(owner: string, repo: string) : Promise<issuesResponse> {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
            owner: owner,
            repo: repo,
            per_page: 100,
        });
        return response;
    } catch (error) {
        // console.error(error);
        throw error;
    }
}
