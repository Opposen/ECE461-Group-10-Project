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
exports.calculateRampUp = void 0;
function calculateRampUp(profile, readme) {
    return __awaiter(this, void 0, void 0, function* () {
        if (profile.data.documentation) {
            //full score if there is a docs site
            return 1;
        }
        else if (profile.data.files.readme && readme.data.size > 100) {
            if (readme.data.size > 500) {
                //small readme
                return 0.25;
            }
            else if (readme.data.size > 2500) {
                //medium readme
                return 0.5;
            }
            else if (readme.data.size > 10000) {
                //large readme
                return 0.75;
            }
        }
    });
}
exports.calculateRampUp = calculateRampUp;
//# sourceMappingURL=rampUp.js.map