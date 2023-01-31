import { Octokit } from "@octokit/core";

export async function getLicence(owner: string, repo: string) {
    const octokit = new Octokit();
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/license', {
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