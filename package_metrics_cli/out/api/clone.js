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
exports.createTempFolder = exports.deleteClonedRepo = exports.cloneRepo = void 0;
const util_1 = require("util");
const child_process_1 = require("child_process");
function cloneRepo(repoUrl, clonePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = `git clone ${repoUrl} ${clonePath}`;
        try {
            var { stdout, stderr } = yield (0, util_1.promisify)(child_process_1.exec)(command);
        }
        catch (err) {
            // console.log(`Error cloning repo: ${repoUrl}`)
            throw err;
        }
    });
}
exports.cloneRepo = cloneRepo;
function deleteClonedRepo(repoPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = `rm -rf ${repoPath}`;
        try {
            var { stdout, stderr } = yield (0, util_1.promisify)(child_process_1.exec)(command);
        }
        catch (err) {
            // console.log(`Error deleting repo: ${repoPath}`)
            throw err;
        }
    });
}
exports.deleteClonedRepo = deleteClonedRepo;
function createTempFolder() {
    const command = `mkdir ./tmp`;
    try {
        var { stdout, stderr } = (0, child_process_1.exec)(command);
    }
    catch (err) {
        // console.log(`Error creating temp folder`)
        throw err;
    }
}
exports.createTempFolder = createTempFolder;
//# sourceMappingURL=clone.js.map