import express, { json } from 'express';
import JsonWebToken from "jsonwebtoken";
import bcrypt from "bcryptjs"
import userSchema from '../Model/user.model.js';
import env from '../Config/env.config.js';

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    try {
        const { userName, email, password } = req.body
        if (!userName || !email || !password) {
            return res.status(400).json({
                success: true,
                message: "All Felids Must Be Required"
            })
        }
        const isUserExist = await userSchema.findOne({ $or: [{ userName }, { email }] })
        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: "User With THis UserName & Email Exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new userSchema({ userName, email, password: hashPassword })
        const creUser = await userSchema.create(newUser)
        return res.status(201).json({
            success: true,
            message: "User Create Successful",
            user: creUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
})

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Felids Required"
            })
        }
        const userExist = await userSchema.findOne({ email })
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }
        const isMatch = await bcrypt.compare(password, userExist.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }
        const token = JsonWebToken.sign(
            { id: userExist._id, name: userExist.userName },
            env.jwt_key,
            { expiresIn: "1h" }
        )
        return res.status(200).json({
            success: true,
            message: "User Login Successful",
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
})

userRouter.post("/logout", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "user logout successful"
    })
})

export default userRouter