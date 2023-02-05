import { contributorsResponse, commitsResponse } from "../api/types";

function getCommitsCount(commits: commitsResponse): number {
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  const oneYearAgoInSeconds = oneYearAgo.getTime() / 1000;

  const commitsData = commits.data;
  let count = 0;
  for (const commit of commitsData) {
    // if the commit has a date
    if (!!commit.commit.committer?.date) {
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

export function calculateBusFactor(contributors: contributorsResponse, commits: commitsResponse): number {
  const contributorsCount = contributors.data.length;
  const commitsCount = getCommitsCount(commits);

  return commitsCount / contributorsCount;
}
