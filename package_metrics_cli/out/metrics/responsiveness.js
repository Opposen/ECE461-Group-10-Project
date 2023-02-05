"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateResponsiveness = void 0;
// calculate responsiveness metric
// this is done by taking the number of issues that have been updated and dividing by the total number of issues
function calculateResponsiveness(issues) {
    const issueData = issues.data;
    const issueCount = issueData.length;
    const responsiveIssues = issueData.filter((issue) => issue.created_at !== issue.updated_at);
    const responsiveIssueCount = responsiveIssues.length;
    return issueCount === 0 ? 0 : responsiveIssueCount / issueCount;
}
exports.calculateResponsiveness = calculateResponsiveness;
//# sourceMappingURL=responsiveness.js.map