import AuthSchema from "../Model/authSchema.modal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
    createAccessToken,
    createRefreshToken
} from "../Middleware/generateToken.middleware.js";

import envVariable from "../Config/env.config.js";

const SignupController = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields Must Be Required"
            });
        }

        const isUserExist = await AuthSchema.findOne({
            $or: [{ email }, { username }]
        });

        if (isUserExist) {
            const userExist = isUserExist.username === username;
            const emailExist = isUserExist.email === email;

            if (userExist && emailExist) {
                return res.status(409).json({
                    success: false,
                    message: "Username and Email Already Taken"
                });
            }

            if (userExist) {
                return res.status(409).json({
                    success: false,
                    message: "Username Already Taken"
                });
            }

            if (emailExist) {
                return res.status(409).json({
                    success: false,
                    message: "Email Already Taken"
                });
            }
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await AuthSchema.create({
            username,
            email,
            password: hashPassword
        });

        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Signup Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const SigninController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields Must Be Required"
            });
        }

        const isUserExist = await AuthSchema.findOne({ email });

        if (!isUserExist) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const comparePwd = await bcrypt.compare(
            password,
            isUserExist.password
        );

        if (!comparePwd) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const payload = {
            id: isUserExist._id.toString(),
            email: isUserExist.email
        };

        const accessToken = createAccessToken(payload);
        const refreshToken = createRefreshToken(payload);

        return res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({
                success: true,
                message: "User Login Successful",
                data: {
                    user: {
                        id: isUserExist._id,
                        username: isUserExist.username,
                        email: isUserExist.email
                    },
                    accessToken
                }
            });

    } catch (error) {
        console.error("Signin Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const RefreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            envVariable.JWT_REFRESH_SECRET
        );

        const accessToken = createAccessToken({
            id: decoded.id,
            email: decoded.email
        });

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            data: {
                accessToken
            }
        });

    } catch (error) {
        console.error("Refresh Token Error:", error.message);

        return res.status(403).json({
            success: false,
            message: "Invalid or expired refresh token"
        });
    }
};


export {
    SignupController,
    SigninController,
    RefreshTokenController
};