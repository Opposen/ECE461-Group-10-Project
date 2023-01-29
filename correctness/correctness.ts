import { Octokit } from "@octokit/core";

function find_tests() {
    // Returns the name of the test file
    // Returns the name of the tests folder
    // Where does it look?
        // Just in the top-level directory
            // What if they hid the tests deeper in the folder structure
                // What if they mix the tests with their code
                    // Then we canot detect them (limitation)
                    // How can we still detect those tests?
                    // How can we identify a source file as a test?
                    // Maybe we classify each source file as either a test or source file
                    // Using NLP techniques
                    // We can look at the structure of the code
                    // We can 
                    // What if they write their tests in another language?
                        // Unlikely
                    // 
                // Improvements
    // A good model might be to identify all the typescript/javascript source files
    // Then classify each file as a test file or a source file
    // Then we simply count the number of bytes in the test files and the number of bytes in the source files
}

// Correctness Metric
//     Assumptions:
//     The folder is a code repository
//     The code is written in typescript/JS
//     Input
//      - Define an object, one of its properties is the root directory of the GitHub repo you want to analyze
//     Output
//      - A value between 0 and 1
//     Algorithm:
//     - Source file / Test file Identification
//     -    Look for a src/source/sources folder
//     -        If none, consider all the js/ts files in the root directory not named test.js/test.ts as source files
//     -    Look for a test/tst/tests folder
//     -        If one, find a test.js/test.ts file in the root directory.
//     - Metric calculation: list of test files, list of source files
//          - We take all the source files and we calculate the number of bytes in each file
//          - We take all the test files, and we calculate the numbero f
//          - 

export function correctness(props: object) {
    const octokit = new Octokit();
    try {
        const profile = await octokit.request('GET /repos/{owner}/{repo}/community/profile', {
            owner,
            repo,
        });
        return profile;
    } catch (error) {
        console.error(error);
        return error;
    }
}