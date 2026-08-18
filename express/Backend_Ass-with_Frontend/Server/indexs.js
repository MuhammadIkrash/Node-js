import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";

import envVariable from "./Config/env.config.js";
import ConnectDB from "./Config/ConnectDB.Config.js";

import authRouter from "./Routes/Auth.router.js";
import userRouter from "./Routes/user.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.error("Bad JSON Payload:", err.message);

        return res.status(400).json({
            success: false,
            message: "Malformed JSON payload."
        });
    }

    console.error("Unhandled Server Error:", err);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

const serverListen = async () => {
    try {
        await ConnectDB();

        const port = envVariable.port;

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {
        console.error("Server Error:", error.message);
    }
};

serverListen();