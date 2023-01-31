import { licenceResponse } from "../api/types";

export async function calculateLicCompatibility(licence: licenceResponse) {
    if(licence.data) {
        return 1;
    }
    return 0;
}