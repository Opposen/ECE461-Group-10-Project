import { logToFile } from "../logging/logging";

import { calculateBusFactor } from "../metrics/busFactor";
import { calculateCorrectness } from "../metrics/correctness";
import { calculateLicenseCompatibility } from "../metrics/licenseCompatibility";
import { calculateRampUp } from "../metrics/rampUp";
import { calculateResponsiveness } from "../metrics/responsiveness";

import { getCommunityProfile } from "./getCommunityProfile";
import { getIssues } from "./getIssues";
import { getReadme } from "./getReadme";
import { getLicense } from "./getLicense";
import { getContributors } from "./getContributors";
import { getCommits } from "./getCommits";
import { calculateNetScore } from "../metrics/netScore";
import { cloneRepo, deleteClonedRepo } from "./clone";


export class PackageDatabase {
    repository_list:Repository[];
    package_directory_path:string;

    constructor(repository_list:Repository[], package_directory_path:string) {
        this.package_directory_path = package_directory_path;
        this.repository_list = repository_list;
    }

    /**
     * Collects package contents
     * @param package_name string name of package
     * @returns package contents in UNIMLEMENTED format, or null on failure
     */
    get_contents_of(package_name:string) {
        for(let repo of this.repository_list) {
            if(repo.name == package_name) {
                return repo.get_contents(this.package_directory_path);
            }
        }
        return null;
    }

    /**
     * Add new repo to the list, exclude if repo already exists
     * @param new_repo 
     * @returns {boolean} repo added or not
     */
    addPackage(new_repo:Repository) {
        for(let repo of this.repository_list) {
            if(repo.name == new_repo.name) {
                return false;
            }
        }
        this.repository_list.push(new_repo);
        return true;
    }

    // UNIMPLEMENTED
    updatePackage(name:string, new_version:string, new_contents:unknown) {
        return -1;
    }
}

export class Repository {
    name: string;
    owner: string;
    url: string;
    current_version: string;
    size: Number;
    history_list: History[];

    constructor(name:string, owner: string, url: string, current_version:string, size:Number, history_list:History[]) {
        this.name = name;
        this.owner = owner;
        this.url = url;
        this.current_version = current_version;
        this.size = size;
        this.history_list = history_list;
    }

    /**
     * Given a directory to pull from, find directory with same name and return contents
     * UNIMPLEMENTED
     * @param path Path to directory containing package
     * @returns Package contents OR success status, unsure of exact implementation
     */
    get_contents(path:string) {
        return -1;
    }

    /**
     * Adds history event to repo history
     * @param new_history 
     */
    add_history(new_history:History) {
        this.history_list.push(new_history);
    }

    /**
     * Collects information on github repo and calculates weighted metrics based on repo information
     * @returns {number} 0-1 representing weighted score
     */
    async get_rating() {
        
        try {
        	let communityProfileResponse = await getCommunityProfile(this.owner, this.name);
            let issuesResponse = await getIssues(this.owner, this.name);
            let readmeResponse = await getReadme(this.owner, this.name);
            let licenseResponse = await getLicense(this.owner, this.name);
            let contributorsResponse = await getContributors(this.owner, this.name);
           	let commitsResponse = await getCommits(this.owner, this.name);
            await cloneRepo(this.url, `./tmp/${this.name}`);

            let busFactor = calculateBusFactor(contributorsResponse, commitsResponse);
            let rampUp = calculateRampUp(communityProfileResponse, readmeResponse);
            let responsiveness = calculateResponsiveness(issuesResponse);
            let licenseCompatibility = calculateLicenseCompatibility(licenseResponse, readmeResponse);
            let correctness = calculateCorrectness(`./tmp/${this.name}`);
            await deleteClonedRepo(`./tmp/${this.name}`);

            let netScore = calculateNetScore(rampUp, correctness, busFactor, responsiveness, licenseCompatibility);
            // print all scores the the console rounded to 2 decimal places
            //console.log(`${url} ${netScore.toFixed(2)} ${rampUp.toFixed(2)} ${correctness.toFixed(2)} ${busFactor.toFixed(2)} ${responsiveness.toFixed(2)} ${licenseCompatibility.toFixed(2)}`)
            //console.log(`${url} ${netScore} ${rampUp} ${correctness} ${busFactor} ${responsiveness} ${licenseCompatibility}`)
            return netScore;
        } catch (error) {
            logToFile(error, 1, "ERROR");
        }

    }

    get_readme() {
        return getReadme(this.owner, this.name);
    }
}

export class History {
    action: string;
    version: string;
    username: string

    constructor(action:string, version:string, username:string) {
        this.action = action;
        this.version = version;
        this.username = username;
    }
}