"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLicCompatibility = void 0;
const compatibleLicenses = ["LGPL-3.0-or-later", "LGPL-3.0-only", "LGPL-2.1-or-later", "LGPL-2.1-only"];
function calculateLicCompatibility(spdx_id) {
    return __awaiter(this, void 0, void 0, function* () {
        // check for compatible licenses
        if (spdx_id && compatibleLicenses.includes(spdx_id)) {
            return 1;
        }
        return 0;
    });
}
exports.calculateLicCompatibility = calculateLicCompatibility;
//# sourceMappingURL=licenseCompatibility.js.map