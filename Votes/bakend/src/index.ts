import dotenv from "dotenv";
import connectDB from "./config/conectDB"; // ודא שהנתיב והסיומת נכונים
import express from "express";
import userRoutes from "./routes/userRoutes";
import candidateRoutes from "./routes/CandidateRoutes";
import errorHandler from "./middleWare/errorHendler"; // תיקון שם המודול
import login from "./routes/loginRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/',userRoutes);
app.use(candidateRoutes);
app.use(login);


app.use(errorHandler); // ודא שהשימוש במידלוואר שגיאות נמצא בסוף כל שאר הנתיבים

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
