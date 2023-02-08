#! /usr/bin/env node

require("dotenv").config({ path: ".env" }); // load environment variables from .env file
const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const figlet = require("figlet");
const program = new Command();

// import community profile
import { getCommunityProfile } from "./api/getCommunityProfile";
import { getReadme } from "./api/getReadme";
import { getLicense } from "./api/getLicense";
import { getIssues } from "./api/getIssues";
import { getContributors } from "./api/getContributors";
import { getCommits } from "./api/getCommits";
import { cloneRepo, createTempFolder, deleteClonedRepo } from "./api/clone";


// import metrics
import { calculateLicenseCompatibility } from "./metrics/licenseCompatibility";
import { calculateRampUp } from "./metrics/rampUp";
import { calculateResponsiveness } from "./metrics/responsiveness";
import { calculateBusFactor } from "./metrics/busFactor";
import { calculateNetScore } from "./metrics/netScore";
import { calculateCorrectness } from "./metrics/correctness";

console.log(figlet.textSync("Package Metrics"));

program
    .version("1.0.0")
    .description("ACME package metrics CLI")
    .option("-u, --url  <value>", "inline url") // not in use
    .option("-f, --file <value>", "absoulte directory of file containing urls")
    .parse(process.argv);

const options = program.opts();

if (options.url) {
    console.log(`url: ${options.url}`);
}

if (options.file) {
    const text = fs.readFileSync(path.resolve(options.file), "utf-8");
    const urlList = text.split("\n")

    // for each url in the list parse the author and package name
    const packageInfo = urlList.map((url: string) => {
        const urlParts = url.split("/")
        const author = urlParts[urlParts.length - 2]
        const packageName = urlParts[urlParts.length - 1]
        return { author, packageName, url }
    });

    // create a tmp directory to clone the repos into
    if (!fs.existsSync("./tmp")) {
        try {
            createTempFolder();
        } catch (err) {
            console.error(err);
        }
    }

    // for each package in the list get the community profile
    console.log('URL NET_SCORE RAMP_UP_SCORE CORRECTNESS_SCORE BUS_FACTOR_SCORE RESPONSIVE_MAINTAINER_SCORE LICENSE_SCORE');
    packageInfo.forEach(async (pkg: any) => {
        // only continue if the url has github.com in it
        if (pkg.url.includes("github.com")) {
            try {
                const communityProfileResponse = await getCommunityProfile(pkg.author, pkg.packageName);
                const issuesResponse = await getIssues(pkg.author, pkg.packageName);
                const readmeResponse = await getReadme(pkg.author, pkg.packageName);
                const licenseResponse = await getLicense(pkg.author, pkg.packageName);
                const contributorsResponse = await getContributors(pkg.author, pkg.packageName);
                const commitsResponse = await getCommits(pkg.author, pkg.packageName);
                await cloneRepo(pkg.url, `./tmp/${pkg.packageName}`);

                const busFactor = calculateBusFactor(contributorsResponse, commitsResponse);
                const rampUp = calculateRampUp(communityProfileResponse, readmeResponse);
                const responsiveness = calculateResponsiveness(issuesResponse);
                const licenseCompatibility = calculateLicenseCompatibility(licenseResponse, readmeResponse);
                const correctness = calculateCorrectness(`./tmp/${pkg.packageName}`);
                await deleteClonedRepo(`./tmp/${pkg.packageName}`);

                const netScore = calculateNetScore(rampUp, correctness, busFactor, responsiveness, licenseCompatibility);
                // print all scores the the console rounded to 2 decimal places
                console.log(`${pkg.url} ${netScore.toFixed(2)} ${rampUp.toFixed(2)} ${correctness.toFixed(2)} ${busFactor.toFixed(2)} ${responsiveness.toFixed(2)} ${licenseCompatibility.toFixed(2)}`)
                //console.log(`${pkg.url} ${netScore} ${rampUp} ${correctness} ${busFactor} ${responsiveness} ${licenseCompatibility}`)
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log(`${pkg.url} is not a github repository (parse from npm)`);
        }
    });
}

// if no options are passed show the help page
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
