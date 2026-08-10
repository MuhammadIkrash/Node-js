import mongoose, { model } from "mongoose";

const studentInfoSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    Profile_Pic: {
        type: String,
    }
})

const StudentInfoSchema = mongoose.model("StudentInfo", studentInfoSchema)
export default StudentInfoSchema