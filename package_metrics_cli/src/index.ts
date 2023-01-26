#! /usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const figlet = require("figlet");
const program = new Command();

// import community profile
import { getCommunityProfile } from "./api/getCommunityProfile";


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
    // print contents to console
    console.log(urlList);
    // for each url in the list parse the author and package name
    
    const packageInfo = urlList.map((url: string) => {
        const urlParts = url.split("/")
        const author = urlParts[urlParts.length - 2]
        const packageName = urlParts[urlParts.length - 1]

        console.log(`author: ${author}, package: ${packageName}`)
        return { author, packageName }
    });

    // for each package in the list get the community profile
    packageInfo.forEach(async (pkg: any) => {
        const profile = await getCommunityProfile(pkg.author, pkg.packageName);
        console.log(profile);
    });
}

// if no options are passed show the help page
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
