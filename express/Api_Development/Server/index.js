import express, { urlencoded } from 'express';
import env from "./Config/env.config.js"
import ConnectDataBase from './Config/DataBase.config.js';
import router from './Routes/student.route.js';
import { MulterError } from 'multer';
const app = express();
// MiddleWare
app.use(urlencoded({ extended: false }))
app.use(express.json())
// Api
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