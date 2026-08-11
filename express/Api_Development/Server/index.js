import express, { urlencoded } from 'express';
import env from "./Config/env.config.js"
import ConnectDataBase from './Config/DataBase.config.js';
import router from './Routes/student.route.js';
import { MulterError } from 'multer';
import cors from "cors"
import path from 'path';
import auth from './Middleware/auth.middleware.js';
import userRouter from './Routes/user.routes.js';
import { fileURLToPath } from 'url';
const app = express();
// MiddleWare
app.use(urlencoded({ extended: false }))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors())
app.use(express.json())
// Api
app.use('/api/user', userRouter)
app.use(auth)
app.use('/api/students', router)
// error MiddleWare
app.use((error, req, res, next) => {
    if (error instanceof MulterError) {
        return res.status(400), send(`Image Error: ${error.message}:${error.code}`);
    } else if (error) {
        return res.status(500).send(`Some Thing Wrong : ${error.message}`)
    }
})
const ServerRunning = () => {
    try {
        ConnectDataBase()
        const port = env.port
        app.listen(port, () => {
            console.log(`Server app listening on port ${port}!`);
        });
    } catch (error) {
        console.log(error)
    }
}

ServerRunning()