import fs from 'fs';

const LOG_FILE = process.env.$LOG_FILE;

const logFile = fs.createWriteStream(LOG_FILE + '/log.txt', { flags: 'a' });

const log = (logLevel: number, message: string) => {
  logFile.write(`[${new Date().toISOString()}] [${logLevel}] ${message}\n`);
};

const logLevel = parseInt(process.env.$LOG_LEVEL) || 0;

if (logLevel === 0) {
  // silent
} else if (logLevel === 1) {
  // output informational message
  const repoName = 'my_repo';
  fs.appendFileSync('log.txt', `Metrics for repository ${repoName}:\n`);
  fs.appendFileSync('log.txt', `Responsiveness data: ${fs.readFileSync('responsiveness.ts', 'utf-8')}\n`);
  fs.appendFileSync('log.txt', `Busfactor data: ${fs.readFileSync('busFactor.ts', 'utf-8')}\n`);
  fs.appendFileSync('log.txt', `Rampup data: ${fs.readFileSync('rampUp.ts', 'utf-8')}\n`);
  fs.appendFileSync('log.txt', `Netscore data: ${fs.readFileSync('netScore.ts', 'utf-8')}\n`);
} else if (logLevel === 2) {
  // output debug messages
  const [contributorsCount, commitsCount] = fs
    .readFileSync('busFactor.ts', 'utf-8')
    .split(',')
    .map(val => parseInt(val, 10));
  const containsTests = fs.readFileSync('correctness.ts', 'utf-8').trim() === 'True';
  const [rawIssueData, issueCount, responsiveIssueCount, rawResponsiveIssues] = fs
    .readFileSync('responsiveness.ts', 'utf-8')
    .trim()
    .split(',');
  const issueData = JSON.parse(rawIssueData);
  const responsiveIssues = rawResponsiveIssues.split(' ');
  fs.appendFileSync('log.txt', 'Debug Information:\n');
  fs.appendFileSync('log.txt', `contributorsCount: ${contributorsCount}\n`);
  fs.appendFileSync('log.txt', `commitsCount: ${commitsCount}\n`);
  fs.appendFileSync('log.txt', `containsTests: ${containsTests}\n`);
  fs.appendFileSync('log.txt', `issueData: ${JSON.stringify(issueData)}\n`);
  fs.appendFileSync('log.txt', `issueCount: ${issueCount}\n`);
  fs.appendFileSync('log.txt', `responsiveIssueCount: ${responsiveIssueCount}\n`);
  fs.appendFileSync('log.txt', `responsiveIssues: ${responsiveIssues}\n`);
} else {
  // default to silent
}