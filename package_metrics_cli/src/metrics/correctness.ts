import { Dirent, readdirSync } from "fs";

const TEST_NAMES = ['Test', 'Tests', 'Tst', 'Tsts', 'test', 'tests', 'tst', 'tsts'];

// the given specification is that the project must have some sort of testing standard
// this function will check if the project has a directory or file that contains the word 'test' in the name
// and will return a 1 if it does, and a 0 if it does not
export function calculateCorrectness(repoDir: string): number {
    
    // Retrieve all the entries from the top level directory of the repo
    const directoryContents: string[] = readdirSync(repoDir, { withFileTypes: true }).map(dirent => dirent.name);

    // Determine whether there is a directory or file that contains the word 'test' in the name
    let containsTests: boolean = directoryContents.some((f: string) => TEST_NAMES.some((testName: string) => f.includes(testName)));

    return Number(containsTests);
}