import mongoose from "mongoose";

const userSchemaDef = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: [true, "Phone Number Required"]
        },

        bio: {
            type: String,
            required: [true, "Bio is required"],
            minlength: [3, "Bio must be at least 3 characters"],
            maxlength: [120, "Bio must not exceed 120 characters"]
        },

        address: {
            type: String,
            required: [true, "Address Must Be Required"]
        },

        accountRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Authentication",
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

export const userSchema = mongoose.model(
    "UserInfo",
    userSchemaDef
);