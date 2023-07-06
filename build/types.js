"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PET_SIZE = void 0;
var PET_SIZE;
(function (PET_SIZE) {
    PET_SIZE["SMALL"] = "small";
    PET_SIZE["MEDIUM"] = "medium";
    PET_SIZE["LARGE"] = "large";
})(PET_SIZE || (exports.PET_SIZE = PET_SIZE = {}));
class UserClass {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }
}
const Cride = new UserClass("Cride", "Fride");
class UserPremium extends UserClass {
    constructor(name, password, premium) {
        super(name, password);
        this.premium = premium;
    }
}
const CrideRico = new UserPremium("Cride", "fride", true);
//# sourceMappingURL=types.js.map