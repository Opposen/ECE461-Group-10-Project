import { promisify } from 'util';
import { exec } from "child_process";

export async function cloneRepo(repoUrl: string, clonePath: string) {
    const command = `git clone ${repoUrl} ${clonePath}`;
    try {
        var { stdout, stderr } = await promisify(exec)(command);
    } catch (err) {
        // console.log(`Error cloning repo: ${repoUrl}`)
        throw err;
    }
}

export async function deleteClonedRepo(repoPath: string) {
    const command = `rm -rf ${repoPath}`;
    try {
        var { stdout, stderr } = await promisify(exec)(command);
    } catch (err) {
        // console.log(`Error deleting repo: ${repoPath}`)
        throw err;
    }
}

export function createTempFolder() {
    const command = `mkdir ./tmp`;
    try {
        var { stdout, stderr } = exec(command);
    } catch (err) {
        // console.log(`Error creating temp folder`)
        throw err;
    }
}