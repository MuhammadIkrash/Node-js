import express from "express";

import { verifyToken } from "../Middleware/generateToken.middleware.js";
import {
    UserInfoGet,
    UserInfoPost
} from "../Controllers/User.controller.js";

const userRouter = express.Router();

userRouter.post(
    "/profile",
    verifyToken,
    UserInfoPost
);

userRouter.get(
    "/profile",
    verifyToken,
    UserInfoGet
);

export default userRouter;