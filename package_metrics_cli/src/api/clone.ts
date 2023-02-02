import { promisify } from 'util';
import { exec } from "child_process";

export async function cloneRepo(repoUrl: string, clonePath: string) {
    const command = `git clone ${repoUrl} ${clonePath}`;
    try {
        var {stdout, stderr} = await promisify(exec)(command);
    } catch (err) {
        console.log(`Error cloning repo: ${repoUrl}`)
        throw err;
    }
}