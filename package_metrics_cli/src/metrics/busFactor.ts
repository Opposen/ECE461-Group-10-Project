const repoName = "REPO_NAME";
const ownerRepo = "OWNER_NAME";
const collaboratorsUrl = `https://api.github.com/repos/${owner}/${repo}/collaborators`;
const commitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;

async function getCollaboratorsCounts(): Promise<number> {
  const response = await fetch(collaboratorsUrl);
  const collaborators = await response.json();
  return collaborators.length;
}

async function getCommitsCount(): Promise<number> {
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  const oneYearAgoInSeconds = oneYearAgo.getTime() / 1000;

  const response = await fetch(commitsUrl);
  const commits = await response.json();
  let count = 0;
  for (const commit of commits) {
    if (commit.commit.committer.date >= oneYearAgoInSeconds) {
      count++;
    }
  }
  return count;
}

async function getCommitToCollaboratorRatio(): Promise<number> {
  const collaboratorsCount = await getCollaboratorsCounts();
  const commitsCount = await getCommitsCount();
  
  return commitsCount / collaboratorsCount;
}
