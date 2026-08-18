import  envVariable  from "./env.config.js"
import mongoose from "mongoose"

const ConnectDB = async () => {
    try {
        await mongoose.connect(`${envVariable.mongodb_uri}`)
        console.log("Mongodb DataBase Connected Successful");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}
export default ConnectDB