"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCorrectness = void 0;
const fs_1 = require("fs");
const TEST_NAMES = ['Test', 'Tests', 'Tst', 'Tsts', 'test', 'tests', 'tst', 'tsts'];
function calculateCorrectness(repoDir) {
    // Retrieve all the entries from the top level directory of the repo
    const directoryContents = (0, fs_1.readdirSync)(repoDir, { withFileTypes: true }).map(dirent => dirent.name);
    // Determine whether there is a directory or file that contains the word 'test' in the name
    let containsTests = directoryContents.some((f) => TEST_NAMES.some((testName) => f.includes(testName)));
    return Number(containsTests);
}
exports.calculateCorrectness = calculateCorrectness;
//# sourceMappingURL=correctness.js.map