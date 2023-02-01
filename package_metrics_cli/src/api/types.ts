import { Endpoints } from "@octokit/types";

export type communityProfileResponse = Endpoints["GET /repos/{owner}/{repo}/community/profile"]["response"];

export type readmeResponse = Endpoints["GET /repos/{owner}/{repo}/readme"]["response"];
