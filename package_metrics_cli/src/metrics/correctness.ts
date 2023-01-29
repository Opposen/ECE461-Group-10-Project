import { Dirent } from "fs";
import { readdir } from "fs/promises"; 

const TEST_DIR_NAMES = ['test', 'tests', 'tst', 'tsts'];
const TEST_FILE_NAMES = TEST_DIR_NAMES.map(name => [name + '.js', name + '.ts']).flat();

export async function correctness(repoDir: string): Promise<Number> {
    // Retrieve all the entries from the top level directory of the repo
    try {
        var files: Dirent[] = await readdir(repoDir, {withFileTypes: true});
    } catch (error) {
        console.log("Error reading files from GitHub Repo: " + repoDir);
        throw error;
    }

    // Determine whether there is a tests directory or test file
    let containsTests: boolean = files.some((f: Dirent) =>
        f.isDirectory() && TEST_DIR_NAMES.includes(f.name) ||
        f.isFile() && TEST_FILE_NAMES.includes(f.name));

    return Number(containsTests);
}