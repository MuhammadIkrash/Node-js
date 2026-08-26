import mongoose from "mongoose"

const profileSchema = new mongoose.Schema({
    username: {
        type: string,
        required: true,
        unique: true,
        default: `User${Math.random()}`
    },
    bio: {
        type: string,
    },
    link: {
        type: String
    },
    posts: {
        
        required: true
    }
})

const profile = mongoose.model('profile', profileSchema)