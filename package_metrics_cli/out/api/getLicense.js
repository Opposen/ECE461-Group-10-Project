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
exports.getLicense = void 0;
const core_1 = require("@octokit/core");
function getLicense(owner, repo) {
    return __awaiter(this, void 0, void 0, function* () {
        // bearer token is process.env.GITHUB_TOKEN
        const octokit = new core_1.Octokit({ auth: process.env.GITHUB_TOKEN });
        try {
            // https://docs.github.com/en/graphql/reference/objects#license
            // get the spdx_id of the license with graphql
            const response = yield octokit.graphql(`
                query getLicense($owner: String!, $repo: String!) {
                    repository(owner: $owner, name: $repo) {
                        licenseInfo {
                            spdxId,
                        }
                    }
                }
            `, {
                owner,
                repo,
            });
            return response;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    });
}
exports.getLicense = getLicense;
//# sourceMappingURL=getLicense.js.map