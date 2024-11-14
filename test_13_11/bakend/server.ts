import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import connectDB from "./src/config/conectDB";
import authRouter from "./src/routes/loginRoutes";
import warriorRouter from "./src/routes/attackRouter";
import { initializeSocketServer } from "./soketServer";

dotenv.config();

const app = express();

const httpServer = createServer(app);

export const io = initializeSocketServer(httpServer);

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRouter);

app.use("/api/attack", warriorRouter);


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => console.log(`server is listening on port ${PORT}`));