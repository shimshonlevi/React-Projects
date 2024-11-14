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
const mongoose_1 = __importDefault(require("mongoose"));
const organizations_json_1 = __importDefault(require("../data/organizations.json"));
const missiles_json_1 = __importDefault(require("../data/missiles.json"));
const orgonizationModel_1 = __importDefault(require("../models/orgonizationModel"));
const missileModel_1 = __importDefault(require("../models/missileModel"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connected = yield mongoose_1.default.connect(process.env.MONGO_URI);
        if ((yield orgonizationModel_1.default.find()).length == 0)
            yield seedWarData();
        console.log("mongoDB connected: ", connected.connection.host);
    }
    catch (error) {
        console.error(error.message);
    }
});
const seedWarData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield orgonizationModel_1.default.insertMany(organizations_json_1.default);
    yield missileModel_1.default.insertMany(missiles_json_1.default);
});
exports.default = connectDB;
