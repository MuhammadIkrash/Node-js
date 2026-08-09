import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
const app = express();
// MiddleWare
app.use(express.json())
app.set("view engine", "ejs")
app.use(urlencoded({ extended: false }))
app.use(cookieParser('myKey'))
const csrfProtection = csurf({ cookie: true })
const safeCsrf = (req, res, next) => {
    csrfProtection(req, res, (err) => {
        if (err && err.code === "EBADCSRFTOKEN") {
            res.send("Invalid Or Expire Csrf Token")
        }
        if (err) return next(err)
        next()
    })
}
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get("/form", csrfProtection, (req, res) => {
    res.render("forms", { csrf: req.csrfToken() })
})
app.post("/submit", safeCsrf, (req, res) => {
    res.send(req.body)
})
app.listen(3000, () => {
    console.log('Example app listening on port port!');
});
