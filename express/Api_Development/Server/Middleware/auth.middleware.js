import userSchema from '../Model/user.model.js';
import JsonWebToken from "jsonwebtoken";
import router from '../Routes/user.routes.js';
import env from '../Config/env.config.js';

const auth = async (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"]
        if (typeof bearerHeader !== undefined) {
            const token = bearerHeader.split(" ")[1]
            const verifyUser = JsonWebToken.verify(token, env.jwt_key, (err, decodedPayload) => {
                if (err) {
                    console.log("err >>", err)
                    return res.status(403).json({ message: 'Invalid or expired token.' });
                }
            })
            req.token = verifyUser
            next()
        } else {
            return res.status(400).json({
                success: false,
                message: "No Token Provided"
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid Or Expire Token"
        })
    }
}

export default auth