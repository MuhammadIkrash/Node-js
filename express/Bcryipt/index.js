import express from 'express';
import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
import session from "express-session"
import ConnectMD from "./Config/database.config.js"
import 'dotenv/config'
import { formSchema } from './Model/signup.model.js';
const app = express();
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret: "123secret",
    resave: false,
    saveUninitialized: false
}))
const checkLogin = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect("/login")
    }
}

app.get('/', checkLogin, (req, res) => {
    try {
        console.log("Session:", req.session)
        res.render("home", { user: req.session.user })
    } catch (error) {
        console.log(error);

    }
})
app.get('/signup', (req, res) => {
    try {
        res.status(200).render('signup', { error: null });

    } catch (error) {
        console.log(error);

    }
});
app.post('/signup', async (req, res) => {
    try {
        const { userName, email, password } = req.body
        if (!userName || !email || !password) {
            return res.status(422).render("signup", { error: "All Felids Must Been Required !" })
        }
        const emailAlreadyTaken = await formSchema.findOne({ email: email })
        if (emailAlreadyTaken) {
            return res.status(409).render("signup", { error: "User With This Email Already Exist" })
        }
        const passwordHash = await bcryptjs.hash(password, 10)
        await formSchema.create({
            userName,
            email,
            password: passwordHash
        })
        res.status(201).redirect("/login")
    } catch (error) {
        console.log(error);

    }
});
app.get("/login", (req, res) => {
    try {
        if (req.session.user) {
            res.redirect('/')
        } else {
            res.render("login", { error: null })
        }
    } catch (error) {
        console.log(error);

    }
})
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.render('login', { error: "All Felids Must Been Fill" })
        }
        const userExist = await formSchema.findOne({ email })
        if (!userExist) {
            return res.status(400).render("login", { error: "User With This Email Not Exist" })
        }
        const isPassMatch = await bcryptjs.compare(password, userExist.password)
        if (!isPassMatch) {
            return res.render("login", { error: "Invalid Password" })
        }
        req.session.user = {
            name: userExist.userName,
            id: userExist._id,
            email: userExist.email
        }
        return res.redirect("/")
    } catch (error) {
        console.log(error);
    }
})
app.get('/logout', (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                res.send('logout Failed')
            }
            res.redirect("/login")
        },
        )
    } catch (error) {
        console.log(error);

    }
})
const listen = async () => {
    try {
        await ConnectMD()
        app.listen(process.env.PORT, () => {
            console.log(`Server Running At ${process.env.PORT} SuccessFully`);
        });
    } catch (error) {
        console.log(error);

    }
}
listen()