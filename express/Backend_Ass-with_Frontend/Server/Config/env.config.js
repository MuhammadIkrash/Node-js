import dotenv from 'dotenv';
dotenv.config();

if (!process.env.PORT) {
    console.log("PORT Number is Not Define in Environment Variable")
}
else if (!process.env.MONGO_DB) {
    console.log("MONGO_DB Uri is Not Define in Environment Variable")
}
else if (!process.env.JWT) {
    console.log("JWT Uri is Not Define in Environment Variable")
}
else if (!process.env.JWT_REFRESH_SECRET) {
    console.log("JWT_REFRESH_SECRET Uri is Not Define in Environment Variable")
}
const envVariable = {
    port: process.env.PORT,
    mongodb_uri: process.env.MONGO_DB,
    JWT: process.env.JWT,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET
}
export default envVariable