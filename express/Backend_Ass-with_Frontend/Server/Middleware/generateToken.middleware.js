import jwt from "jsonwebtoken";
import envVariable from "../Config/env.config.js";

const createAccessToken = (payload) => {
    return jwt.sign(
        payload,
        envVariable.JWT,
        {
            expiresIn: "1m"
        }
    );
};

const createRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        envVariable.JWT_REFRESH_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        const token =
            authHeader && authHeader.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : null;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token missing."
            });
        }

        jwt.verify(
            token,
            envVariable.JWT,
            (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        success: false,
                        message: "Invalid or expired access token."
                    });
                }

                req.user = decoded;
                next();
            }
        );
    } catch (error) {
        console.error("JWT Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export {
    createAccessToken,
    createRefreshToken,
    verifyToken
};