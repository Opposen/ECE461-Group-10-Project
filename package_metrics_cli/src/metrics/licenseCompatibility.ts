import { licenseResponse } from "../api/types";
import { readmeResponse } from "../api/types";

const compatibleLicenses = [
    "LGPL-2.1",
    "BSD-3-Clause",
    "BSD-2-Clause",
    "CC0-1.0",
    "Unlicense",
    "MIT"
];

export function calculateLicenseCompatibility(license: licenseResponse, readme: readmeResponse) {
    // check for compatible licenses
    if(license?.repository?.licenseInfo?.spdxId && compatibleLicenses.includes(license.repository.licenseInfo.spdxId)) {
        return 1;
    }
    // check if readme contains license
    if(readme.data.content) {
        const readmeText = Buffer.from(readme.data.content, "base64").toString("ascii");
        // if any of the compatible licenses are in the readme, return 1
        if(compatibleLicenses.some((license) => readmeText.includes(license))) {
            return 1;
        }
    }
    return 0;
}