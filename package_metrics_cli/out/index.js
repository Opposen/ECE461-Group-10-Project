#! /usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const figlet = require("figlet");
const program = new Command();
// import community profile
const getCommunityProfile_1 = require("./api/getCommunityProfile");
const getReadme_1 = require("./api/getReadme");
const getLicense_1 = require("./api/getLicense");
const getIssues_1 = require("./api/getIssues");
const getContributors_1 = require("./api/getContributors");
const getCommits_1 = require("./api/getCommits");
const clone_1 = require("./api/clone");
// import metrics
const licenseCompatibility_1 = require("./metrics/licenseCompatibility");
const rampUp_1 = require("./metrics/rampUp");
const responsiveness_1 = require("./metrics/responsiveness");
const busFactor_1 = require("./metrics/busFactor");
const netScore_1 = require("./metrics/netScore");
const correctness_1 = require("./metrics/correctness");
console.log(figlet.textSync("Package Metrics"));
program
    .version("1.0.0")
    .description("ACME package metrics CLI")
    .option("-u, --url  <value>", "inline url")
    .option("-f, --file <value>", "absoulte directory of file containing urls")
    .parse(process.argv);
const options = program.opts();
if (options.url) {
    console.log(`url: ${options.url}`);
}
if (options.file) {
    const text = fs.readFileSync(path.resolve(options.file), "utf-8");
    const urlList = text.split("\n");
    // for each url in the list parse the author and package name
    const packageInfo = urlList.map((url) => {
        const urlParts = url.split("/");
        const author = urlParts[urlParts.length - 2];
        const packageName = urlParts[urlParts.length - 1];
        return { author, packageName, url };
    });
    // create a tmp directory to clone the repos into
    if (!fs.existsSync("./tmp")) {
        try {
            (0, clone_1.createTempFolder)();
        }
        catch (err) {
            console.error(err);
        }
    }
    // for each package in the list get the community profile
    console.log('URL NET_SCORE RAMP_UP_SCORE CORRECTNESS_SCORE BUS_FACTOR_SCORE RESPONSIVE_MAINTAINER_SCORE LICENSE_SCORE');
    packageInfo.forEach((pkg) => __awaiter(void 0, void 0, void 0, function* () {
        // only continue if the url has github.com in it
        if (pkg.url.includes("github.com")) {
            try {
                const communityProfileResponse = yield (0, getCommunityProfile_1.getCommunityProfile)(pkg.author, pkg.packageName);
                const issuesResponse = yield (0, getIssues_1.getIssues)(pkg.author, pkg.packageName);
                const readmeResponse = yield (0, getReadme_1.getReadme)(pkg.author, pkg.packageName);
                const licenseResponse = yield (0, getLicense_1.getLicense)(pkg.author, pkg.packageName);
                const contributorsResponse = yield (0, getContributors_1.getContributors)(pkg.author, pkg.packageName);
                const commitsResponse = yield (0, getCommits_1.getCommits)(pkg.author, pkg.packageName);
                yield (0, clone_1.cloneRepo)(pkg.url, `./tmp/${pkg.packageName}`);
                const busFactor = (0, busFactor_1.calculateBusFactor)(contributorsResponse, commitsResponse);
                const rampUp = (0, rampUp_1.calculateRampUp)(communityProfileResponse, readmeResponse);
                const responsiveness = (0, responsiveness_1.calculateResponsiveness)(issuesResponse);
                const licenseCompatibility = (0, licenseCompatibility_1.calculateLicenseCompatibility)(licenseResponse, readmeResponse);
                const correctness = (0, correctness_1.calculateCorrectness)(`./tmp/${pkg.packageName}`);
                yield (0, clone_1.deleteClonedRepo)(`./tmp/${pkg.packageName}`);
                const netScore = (0, netScore_1.calculateNetScore)(rampUp, correctness, busFactor, responsiveness, licenseCompatibility);
                // print all scores the the console rounded to 2 decimal places
                console.log(`${pkg.url} ${netScore.toFixed(2)} ${rampUp.toFixed(2)} ${correctness.toFixed(2)} ${busFactor.toFixed(2)} ${responsiveness.toFixed(2)} ${licenseCompatibility.toFixed(2)}`);
                //console.log(`${pkg.url} ${netScore} ${rampUp} ${correctness} ${busFactor} ${responsiveness} ${licenseCompatibility}`)
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            console.log(`${pkg.url} is not a github repository (parse from npm)`);
        }
    }));
}
// if no options are passed show the help page
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=index.js.map