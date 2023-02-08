import { communityProfileResponse, readmeResponse } from "../api/types";

// the ramp up metric is calculated by first checking if there is a documentation site
// if there is a documentation site, then the metric returns 1 (maximum score)
// the score is then proportial to the size of the readme, with a maximum score of 0.75
// and a minimum score of 0 if there is no or very small readme
export function calculateRampUp(profile: communityProfileResponse, readme: readmeResponse) : number {
    if (profile.data.documentation) {
        //full score if there is a docs site
        return 1;
    } else if (profile.data.files.readme) {
        if (readme.data.size > 5000) {
            // large readme
            return 0.75
        } else if (readme.data.size > 2500) {
            //medium readme
            return 0.5
        } else if (readme.data.size > 500) {
            //small readme
            return 0.25
        }
    }
    // no documentation
    return 0;
}
