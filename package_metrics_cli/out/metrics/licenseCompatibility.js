"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLicenseCompatibility = void 0;
const compatibleLicenses = [
    "LGPL-3.0",
    "LGPL-2.1",
    "GPL-3.0",
    "GPL-2.0",
    "AGPL-3.0",
    "MIT"
];
function calculateLicenseCompatibility(license, readme) {
    var _a, _b;
    // check for compatible licenses
    if (((_b = (_a = license === null || license === void 0 ? void 0 : license.repository) === null || _a === void 0 ? void 0 : _a.licenseInfo) === null || _b === void 0 ? void 0 : _b.spdxId) && compatibleLicenses.includes(license.repository.licenseInfo.spdxId)) {
        return 1;
    }
    // check if readme contains license
    if (readme.data.content) {
        const readmeText = Buffer.from(readme.data.content, "base64").toString("ascii");
        // if any of the compatible licenses are in the readme, return 1
        if (compatibleLicenses.some((license) => readmeText.includes(license))) {
            return 1;
        }
    }
    return 0;
}
exports.calculateLicenseCompatibility = calculateLicenseCompatibility;
//# sourceMappingURL=licenseCompatibility.js.map