
const compatibleLicenses = ["LGPL-3.0-or-later", "LGPL-3.0-only", "LGPL-2.1-or-later", "LGPL-2.1-only"];

export async function calculateLicCompatibility(spdx_id: string) {
    // check for compatible licenses
    if(spdx_id && compatibleLicenses.includes(spdx_id)) {
        return 1;
    }
    return 0;
}