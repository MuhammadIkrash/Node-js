import mongoose from "mongoose"

const userSchemaDef = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const userSchema = mongoose.model('user', userSchemaDef)

export default userSchema