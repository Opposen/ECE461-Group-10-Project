"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.correctness = void 0;
const promises_1 = require("fs/promises");
const TEST_DIR_NAMES = ['test', 'tests', 'tst', 'tsts'];
const TEST_FILE_NAMES = TEST_DIR_NAMES.map(name => [name + '.js', name + '.ts']).flat();
function correctness(repoDir) {
    return __awaiter(this, void 0, void 0, function* () {
        // Retrieve all the entries from the top level directory of the repo
        try {
            var files = yield (0, promises_1.readdir)(repoDir, { withFileTypes: true });
        }
        catch (error) {
            console.log("Error reading files from GitHub Repo: " + repoDir);
            throw error;
        }
        // Determine whether there is a tests directory or test file
        let containsTests = files.some((f) => f.isDirectory() && TEST_DIR_NAMES.includes(f.name) ||
            f.isFile() && TEST_FILE_NAMES.includes(f.name));
        return Number(containsTests);
    });
}
exports.correctness = correctness;
//# sourceMappingURL=correctness.js.map