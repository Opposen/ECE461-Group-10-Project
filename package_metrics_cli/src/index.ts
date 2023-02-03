#! /usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const figlet = require("figlet");
const program = new Command();

// import community profile
import { getCommunityProfile } from "./api/getCommunityProfile";
import { getReadme } from "./api/getReadme";
import { getLicense } from "./api/getLicense";


// import metrics
import { calculateLicenseCompatibility } from "./metrics/licenseCompatibility";

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
    const urlList = text.split("\n")

    // for each url in the list parse the author and package name
    const packageInfo = urlList.map((url: string) => {
        const urlParts = url.split("/")
        const author = urlParts[urlParts.length - 2]
        const packageName = urlParts[urlParts.length - 1]
        return { author, packageName, url }
    });

    // for each package in the list get the community profile
    packageInfo.forEach(async (pkg: any) => {
        // only continue if the url has github.com in it
        if (pkg.url.includes("github.com")) {
            try{
                const communityProfileResponse = await getCommunityProfile(pkg.author, pkg.packageName);
                const readmeResponse = await getReadme(pkg.author, pkg.packageName);
                const licenseResponse = await getLicense(pkg.author, pkg.packageName);
                const licenseCompatibility = calculateLicenseCompatibility(licenseResponse, readmeResponse);
                console.log(`${pkg.url} license compatibility: ${licenseCompatibility}`)
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
