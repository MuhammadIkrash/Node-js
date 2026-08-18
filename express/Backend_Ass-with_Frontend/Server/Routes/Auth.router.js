import express from "express";

import {
    signupValidation,
    signinValidation
} from "../Middleware/express_validator.js";

import {
    SignupController,
    SigninController,
    RefreshTokenController
} from "../Controllers/Auth.controller.js";

const authRouter = express.Router();

authRouter.post(
    "/Signup",
    signupValidation,
    SignupController
);

authRouter.post(
    "/Signin",
    signinValidation,
    SigninController
);

authRouter.post(
    "/refresh",
    RefreshTokenController
);

export default authRouter;