import { Endpoints } from "@octokit/types";

export type communityProfileResponse = Endpoints["GET /repos/{owner}/{repo}/community/profile"]["response"];

export type contributorsResponse = Endpoints["GET /repos/{owner}/{repo}/contributors"]["response"];

export type commitsResponse = Endpoints["GET /repos/{owner}/{repo}/commits"]["response"];

export type issuesResponse = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"];

export type licenseResponse = {
    repository: {
        licenseInfo: {
            spdxId: string;
        }
    }
};

export type readmeResponse = Endpoints["GET /repos/{owner}/{repo}/readme"]["response"];

export type pkgResponse = {
    repository: {
        url: string
    },
    homepage: {
        url: string
    }
};

