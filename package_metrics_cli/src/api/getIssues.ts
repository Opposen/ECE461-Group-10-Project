import { Octokit } from "@octokit/core";

export async function getIssues(owner: string, repo: string) : Promise<any> {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
            accept: 'application/vnd.github+json',
            owner: owner,
            repo: repo,
        });
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
}
