import { communityProfileResponse, readmeResponse } from "../api/types";

export function calculateRampUp(profile: communityProfileResponse, readme: readmeResponse) : number {
    if (profile.data.documentation) {
        //full score if there is a docs site
        return 1;
    } else if (profile.data.files.readme && readme.data.size > 100) {
        if (readme.data.size > 500) {
            //small readme
            return 0.25
        } else if (readme.data.size > 2500) {
            //medium readme
            return 0.5
        } else if (readme.data.size > 10000) {
            //large readme
            return 0.75
        }
    }
    // no documentation
    return 0;
}
