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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exploadedRocket = exports.launchRocket = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const launchRocket = (id, missileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield userModel_1.default.findById(id);
        if (!User)
            throw new Error(`User with id ${id} not founded`);
        const missileIndex = User.resources.findIndex((m) => m.missile.id == missileId);
        if (missileIndex < 0)
            throw new Error("the missile with id " + missileId + " wasn't found in the resources");
        User.resources[missileIndex].amount -= 1;
        yield User.save();
        return User;
    }
    catch (error) {
        throw new Error("error occured while trying to launch a rocket due to error: " + error.message);
    }
});
exports.launchRocket = launchRocket;
const exploadedRocket = (id, missileId, status, attacker) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warrior = yield userModel_1.default.findById(id);
        if (!warrior)
            throw new Error(`warrior with id ${id} not founded`);
        warrior.launchHistory.push({ rocket: attacker, status: status });
        yield warrior.save();
        return warrior;
    }
    catch (error) {
        throw new Error("an error occured while trying to handle exploation of rocket due to error: " + error.message);
    }
});
exports.exploadedRocket = exploadedRocket;
//     try {
//         const User = await userModel.findById(id);
//         if(!User)
//             throw new Error(`User with id ${id} not founded`);
//         const missileIndex = User.resources.findIndex((m: IMissileResource) => m.missile.id == missileId)
//         if(missileIndex < 0)
//             throw new Error("the missile with id "+missileId+" wasn't found in the resources");
//         const rocketName = User.resources[missileIndex].missile.name;
//         User.launchHistory.push({rocket: rocketName, status: status});
//         await User.save();
//         return User;
//     } 
//     catch (error: any) {
//         throw new Error("an error occured while trying to handle exploation of rocket due to error: " + error.message);
//     }
// }
