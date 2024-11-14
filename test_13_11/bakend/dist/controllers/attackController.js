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
exports.handleExploation = exports.handleLaunch = void 0;
const attackService_1 = require("../services/attackService");
const handleLaunch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warriorId = req.params.id;
        const missileId = req.params.missileId;
        if (!warriorId || !missileId) {
            res.status(400).json({ message: "you have to send the id of warrior and the missileId in the params" });
            return;
        }
        const updatedWarrior = yield (0, attackService_1.launchRocket)(warriorId, missileId);
        res.status(200).json({ success: true, message: "missile amount successfully substracted", updatedWarrior });
    }
    catch (error) {
        next(error);
    }
});
exports.handleLaunch = handleLaunch;
const handleExploation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warriorId = req.params.id;
        if (!warriorId) {
            res.status(400).json({ message: "you have to send the id of warrior and the missileId in the params" });
            return;
        }
        const status = req.body.status;
        const attacker = req.body.attacker;
        if (!status || !attacker) {
            res.status(400).json({ message: "you have to send the status of the rocket in the body" });
            return;
        }
        const updatedWarrior = yield (0, attackService_1.exploadedRocket)(warriorId, status, attacker, req.body.missileId);
        res.status(200).json({ success: true, message: "succeeded to update the launchHistory of the warrior", updatedWarrior });
    }
    catch (error) {
        next(error);
    }
});
exports.handleExploation = handleExploation;
