import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cookieParser("secretKey123"))

app.get('/setCookie', (req, res) => {
    res.cookie('username', "Muhammad_Ikrash", {
        maxAge: 1000 * 60 * 1,
        httpOnly: true,
        signed: true
    })
    res.send("cookie Set")
});
app.get('/getCookie', (req, res) => {
    const getCookie = req.signedCookies.username
    console.log(getCookie);

    if (!getCookie) {
        return res.send("Cannot Found Cookie")
    }
    res.send(`Welcome ${getCookie}`)
})
app.get('/deleteCookie', (req, res) => {
    res.clearCookie("username")
    res.send("Cookie Clear")
})
app.listen(3000, () => {
    console.log('Server app listening on port 3000!');
});
