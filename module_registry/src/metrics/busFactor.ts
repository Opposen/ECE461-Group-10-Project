import { contributorsResponse, commitsResponse } from "../api/types";
import { logToFile } from "../logging/logging";

// the bus factor is the number of contributors divided by the number of commits
// if the bus factor is greater than 1, then the bus factor is 1 (maximum score)
// commit count and contributor count are both capped at 100 due to the GitHub API rate limit
// if there are both 100 contributors and 100 commits, then the bus factor is 1 which is the maximum score
export function calculateBusFactor(contributors: contributorsResponse, commits: commitsResponse): number {
  const contributorsCount = contributors.data.length;
  const commitsCount = commits.data.length;
  const busFactor = contributorsCount / commitsCount;

  logToFile(commitsCount, 2, "Commits Count");
  logToFile(contributorsCount, 2, "Contributors Count");
  logToFile(busFactor, 1, "Bus Factor");

  return busFactor > 1 ? 1 : busFactor;
}
