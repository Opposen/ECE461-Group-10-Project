"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBusFactor = void 0;
function getCommitsCount(commits) {
    var _a;
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
    const oneYearAgoInSeconds = oneYearAgo.getTime() / 1000;
    const commitsData = commits.data;
    let count = 0;
    for (const commit of commitsData) {
        // if the commit has a date
        if (!!((_a = commit.commit.committer) === null || _a === void 0 ? void 0 : _a.date)) {
            // get the committer date and convert it to seconds
            const committerDate = commit.commit.committer.date;
            const committerDateInSeconds = Date.parse(committerDate) / 1000;
            if (committerDateInSeconds >= oneYearAgoInSeconds) {
                count++;
            }
        }
    }
    return count;
}
function calculateBusFactor(contributors, commits) {
    const contributorsCount = contributors.data.length;
    const commitsCount = getCommitsCount(commits);
    return commitsCount / contributorsCount;
}
exports.calculateBusFactor = calculateBusFactor;
//# sourceMappingURL=busFactor.js.map