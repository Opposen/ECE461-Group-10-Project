const repo = "REPO_NAME";
const owner = "OWNER_NAME";
const issuesUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;

async function getIssue(): Promise<Array<{ createdAt: number, closedAt?: number }>> {
  const response = await fetch(issuesUrl);
  const issues = await response.json();

  const issueData: Array<{ createdAt: number, closedAt?: number }> = [];
  for (const issue of issues) {
    const createdAt = issue.created_at;
    const createdTimeInSeconds = Date.parse(createdAt) / 1000;

    if (issue.closed_at) {
      const closedAt = issue.closed_at;
      const closedTimeInSeconds = Date.parse(closedAt) / 1000;
      issueData.push({ createdAt: createdTimeInSeconds, closedAt: closedTimeInSeconds });
    } else {
      issueData.push({ createdAt: createdTimeInSeconds });
    }
  }
  return issueData;
}

async function calculateAverageTimeOpen() {
  const issueData = await getIssue();

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
  const responseScore = 1 / time3Days
  return responseScore
  
}
