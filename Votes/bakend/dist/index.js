"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const conectDB_1 = __importDefault(require("./config/conectDB")); // ודא שהנתיב והסיומת נכונים
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const CandidateRoutes_1 = __importDefault(require("./routes/CandidateRoutes"));
const errorHendler_1 = __importDefault(require("./middleWare/errorHendler")); // תיקון שם המודול
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
dotenv_1.default.config();
(0, conectDB_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
app.use('/', userRoutes_1.default);
app.use(CandidateRoutes_1.default);
app.use(loginRoutes_1.default);
app.use(errorHendler_1.default); // ודא שהשימוש במידלוואר שגיאות נמצא בסוף כל שאר הנתיבים
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
