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
// import metrics
const licenseCompatibility_1 = require("./metrics/licenseCompatibility");
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
    // for each package in the list get the community profile
    packageInfo.forEach((pkg) => __awaiter(void 0, void 0, void 0, function* () {
        // only continue if the url has github.com in it
        if (pkg.url.includes("github.com")) {
            try {
                const communityProfileResponse = yield (0, getCommunityProfile_1.getCommunityProfile)(pkg.author, pkg.packageName);
                const readmeResponse = yield (0, getReadme_1.getReadme)(pkg.author, pkg.packageName);
                const licenseResponse = yield (0, getLicense_1.getLicense)(pkg.author, pkg.packageName);
                const licenseCompatibility = (0, licenseCompatibility_1.calculateLicenseCompatibility)(licenseResponse, readmeResponse);
                console.log(`${pkg.url} license compatibility: ${licenseCompatibility}`);
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