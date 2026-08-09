import mongoose from "mongoose";
import "dotenv/config"

const ConnectMD = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo DB Connected");
}

export default ConnectMD