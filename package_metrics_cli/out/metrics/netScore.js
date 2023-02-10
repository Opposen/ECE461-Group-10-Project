"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNetScore = void 0;
const logging_1 = require("../logging/logging");
function calculateNetScore(rampUp, correctness, busFactor, responsiveness, license) {
    // calculate net score
    // this is done by a weighted the average of the ramp up score, correctness score, bus factor score, and responsiveness score
    // the weights are 0.1, 0.1, 0.5, and 0.3 respectively
    // the final score is then multiplied by license score to invalidate packages with incompatible licenses
    const netScore = (0.1 * rampUp + 0.1 * correctness + 0.5 * busFactor + 0.3 * responsiveness) * license;
    (0, logging_1.logToFile)(netScore, 2, "net score breakdown", `0.1 * ${rampUp} + 0.1 * ${correctness} + 0.5 * ${busFactor} + 0.3 * ${responsiveness} * ${license}`);
    (0, logging_1.logToFile)(netScore, 1, "Net Score");
    return netScore;
}
exports.calculateNetScore = calculateNetScore;
//# sourceMappingURL=netScore.js.map