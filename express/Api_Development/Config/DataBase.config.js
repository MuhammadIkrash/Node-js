import env from "./env.config.js";
import mongoose from "mongoose";
const ConnectDataBase = () => {
    try {
        mongoose.connect(env.mongo_uri)
            .then(() => console.log("Mongodb Connected SuccessFul"))
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error);

    }
}
export default ConnectDataBase