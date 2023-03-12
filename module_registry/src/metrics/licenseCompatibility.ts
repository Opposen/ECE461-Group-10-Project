import { licenseResponse } from "../api/types";
import { readmeResponse } from "../api/types";
import { logToFile } from "../logging/logging";

// list of compatible licenses
const compatibleLicenses = [
    "LGPL-2.1",
    "BSD-3-Clause",
    "BSD-2-Clause",
    "CC0-1.0",
    "Unlicense",
    "MIT"
];

// the license compatibility metric is calculated by checking if the license is compatible
// if the license is not compatible, then the readme is checked for a compatible license
// if the license is compatible, then the metric returns 1 if not it returns 0
export function calculateLicenseCompatibility(license: licenseResponse, readme: readmeResponse) {
    
    logToFile(license?.repository?.licenseInfo?.spdxId, 2, "spdxId");
    
    // check for compatible licenses
    if(license?.repository?.licenseInfo?.spdxId && compatibleLicenses.includes(license.repository.licenseInfo.spdxId)) {
        logToFile(1, 1, "License Compatibility");
        return 1;
    }
    // check if readme contains license
    if(readme.data.content) {
        const readmeText = Buffer.from(readme.data.content, "base64").toString("ascii");
        // if any of the compatible licenses are in the readme, return 1
        if(compatibleLicenses.some((license) => readmeText.includes(license))) {
            logToFile(true, 2, "compatible license in readme");
            logToFile(1, 1, "License Compatibility");
            return 1;
        }
    }
    logToFile(0, 1, "License Compatibility");
    return 0;
}