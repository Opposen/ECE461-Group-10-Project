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
const repo = "REPO_NAME";
const owner = "OWNER_NAME";
const issuesUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;
function getIssue() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(issuesUrl);
        const issues = yield response.json();
        const issueData = [];
        for (const issue of issues) {
            const createdAt = issue.created_at;
            const createdTimeInSeconds = Date.parse(createdAt) / 1000;
            if (issue.closed_at) {
                const closedAt = issue.closed_at;
                const closedTimeInSeconds = Date.parse(closedAt) / 1000;
                issueData.push({ createdAt: createdTimeInSeconds, closedAt: closedTimeInSeconds });
            }
            else {
                issueData.push({ createdAt: createdTimeInSeconds });
            }
        }
        return issueData;
    });
}
function calculateAverageTimeOpen() {
    return __awaiter(this, void 0, void 0, function* () {
        const issueData = yield getIssue();
        let totalTimeOpen = 0;
        let closedIssueCount = 0;
        for (const issue of issueData) {
            if (issue.closedAt) {
                totalTimeOpen += issue.closedAt - issue.createdAt;
                closedIssueCount++;
            }
        }
        const averageTimeOpen = totalTimeOpen / closedIssueCount;
        const time3Days = averageTimeOpen / 4320;
        const responseScore = 1 / time3Days;
        return responseScore;
    });
}
//# sourceMappingURL=responsiveness.js.map