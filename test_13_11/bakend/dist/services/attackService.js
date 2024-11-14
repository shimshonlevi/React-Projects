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
const mongoose_1 = __importDefault(require("mongoose"));
const launchRocket = (id, missileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // המרת ה-id ל-ObjectId
        const objectId = new mongoose_1.default.Types.ObjectId(id);
        const user = yield userModel_1.default.findById(objectId);
        if (!user)
            throw new Error(`User with id ${id} not found`);
        // const missileIndex = user.resources.findIndex((m: IMissileResource) => m.missile.id === missileId);
        const missileIndex = user.resources.findIndex((m) => m.missile._id.toString() === missileId);
        console.log("missileIndex", missileIndex);
        if (missileIndex < 0)
            throw new Error(`Missile with id ${missileId} not found in resources`);
        user.resources[missileIndex].amount -= 1;
        yield user.save();
        return user;
    }
    catch (error) {
        throw new Error(`Error occurred while trying to launch a rocket due to: ${error.message}`);
    }
});
exports.launchRocket = launchRocket;
const exploadedRocket = (id, status, attackerId, missileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warrior = yield userModel_1.default.findById(id);
        if (!warrior)
            throw new Error(`Warrior with id ${id} not found`);
        // המרת המתקיף ל-ObjectId
        const attackerObjectId = new mongoose_1.default.Types.ObjectId(attackerId);
        // הוספת פרטי השיגור להיסטוריית השיגור של הלוחם
        warrior.launchHistory.push({ rocket: attackerObjectId, status });
        yield warrior.save();
        return warrior;
    }
    catch (error) {
        throw new Error("An error occurred while trying to handle explosion of rocket due to: " + error.message);
    }
});
exports.exploadedRocket = exploadedRocket;
