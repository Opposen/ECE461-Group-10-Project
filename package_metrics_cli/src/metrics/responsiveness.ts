import { issuesResponse } from "../api/types";
import { logToFile } from "../logging/logging";

// calculate responsiveness metric
// this is done by taking the number of issues that have been updated and dividing by the total number of issues
// if there are more than 100 issues, this will only calculate the responsiveness of the first 100 issues
// we believe that is an acceptable tradeoff for the sake of the GitHub API rate limit
export function calculateResponsiveness(issues: issuesResponse) {

    const issueData = issues.data;
    const issueCount = issueData.length;
    const responsiveIssues = issueData.filter((issue) => issue.created_at !== issue.updated_at);
    const responsiveIssueCount = responsiveIssues.length;

    logToFile(issueCount, 2, "Issue Count");
    logToFile(responsiveIssueCount, 2, "Responsive Issue Count");
    logToFile(responsiveIssueCount / issueCount, 1, "Responsiveness");

    return issueCount === 0 ? 0 : responsiveIssueCount / issueCount;
}
