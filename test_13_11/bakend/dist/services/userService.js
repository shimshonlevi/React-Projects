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
exports.UserLogin = exports.idfRegister = exports.terroristRegister = void 0;
const missileModel_1 = __importDefault(require("../models/missileModel"));
const orgonizationModel_1 = __importDefault(require("../models/orgonizationModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const terroristRegister = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myOrganization = yield orgonizationModel_1.default.findOne({ name: data.organization });
        if (!myOrganization)
            throw new Error("organization not found");
        let mySources = [];
        for (const r of myOrganization.resources) {
            const myMissile = yield missileModel_1.default.findOne({ name: r.name });
            if (!myMissile)
                throw new Error("missile in resource not found");
            mySources.push({ missile: myMissile, amount: r.amount });
        }
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
        const newTerrorist = yield userModel_1.default.create({
            username: data.username,
            password: hashedPassword,
            organization: data.organization,
            resources: mySources
        });
        return newTerrorist;
    }
    catch (error) {
        throw new Error("error by insert terrorist: " + error.message);
    }
});
exports.terroristRegister = terroristRegister;
const idfRegister = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idfLocation = `${data.organization} - ${data.location}`;
        const myOrganization = yield orgonizationModel_1.default.findOne({ name: idfLocation });
        if (!myOrganization)
            throw new Error("organization you are trying to join not found");
        let mySources = [];
        myOrganization.resources.forEach((r) => __awaiter(void 0, void 0, void 0, function* () {
            const myMissile = yield missileModel_1.default.findOne({ name: r.name });
            if (!myMissile)
                throw new Error("missile in organization's resource not found");
            mySources.push({ missile: myMissile, amount: r.amount });
        }));
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
        const newSoldier = yield userModel_1.default.create({
            username: data.username,
            password: hashedPassword,
            organization: data.organization,
            location: data.location,
            resources: mySources
        });
        return newSoldier;
    }
    catch (error) {
        throw new Error("error occured while trying to register a soldier" + error.message);
    }
});
exports.idfRegister = idfRegister;
const UserLogin = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield userModel_1.default.findOne({ username });
        if (!User)
            throw new Error("User not found!");
        const comparedPassword = yield bcrypt_1.default.compare(password, User.password);
        if (!comparedPassword)
            throw new Error("Invalid Password");
        return User;
    }
    catch (error) {
        throw new Error("error occured while trying to logging in" + error.message);
    }
});
exports.UserLogin = UserLogin;
