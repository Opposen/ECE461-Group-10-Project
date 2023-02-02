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
const repoName = "REPO_NAME";
const ownerRepo = "OWNER_NAME";
const collaboratorsUrl = `https://api.github.com/repos/${owner}/${repo}/collaborators`;
const commitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;
function getCollaboratorsCounts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(collaboratorsUrl);
        const collaborators = yield response.json();
        return collaborators.length;
    });
}
function getCommitsCount() {
    return __awaiter(this, void 0, void 0, function* () {
        const currentDate = new Date();
        const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
        const oneYearAgoInSeconds = oneYearAgo.getTime() / 1000;
        const response = yield fetch(commitsUrl);
        const commits = yield response.json();
        let count = 0;
        for (const commit of commits) {
            if (commit.commit.committer.date >= oneYearAgoInSeconds) {
                count++;
            }
        }
        return count;
    });
}
function getCommitToCollaboratorRatio() {
    return __awaiter(this, void 0, void 0, function* () {
        const collaboratorsCount = yield getCollaboratorsCounts();
        const commitsCount = yield getCommitsCount();
        return commitsCount / collaboratorsCount;
    });
}
//# sourceMappingURL=busFactor.js.map