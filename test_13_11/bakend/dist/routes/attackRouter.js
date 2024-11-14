"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attackController_1 = require("../controllers/attackController");
const authMiddleware_1 = require("../middleWare/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authWithBearer);
router.route("/:id/launched/:missileId").put(attackController_1.handleLaunch);
router.route("/:id/exploaded").put(attackController_1.handleExploation);
exports.default = router;
