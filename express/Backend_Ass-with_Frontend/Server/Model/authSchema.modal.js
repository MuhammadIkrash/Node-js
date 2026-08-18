import mongoose from 'mongoose';

const AuthSchemaDef = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: [true, 'Username is Used.'],
        minlength: [3, 'Username Must Be at least 3 Character long'],
        maxlength: [12, 'Username Must Be at least 3 Character long']
    },
    email: {
        type: String,
        required: [true, 'Username is required.'],
        lowercase: true,
        trim: true,
        unique: [true, 'Email is Used Already.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
    }
}, {
    timestamps: true
})

const AuthSchema = mongoose.model("Authentication", AuthSchemaDef)

export default AuthSchema