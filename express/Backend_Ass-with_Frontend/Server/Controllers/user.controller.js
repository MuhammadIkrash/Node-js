import { userSchema } from "../Model/user.schema.js";


const UserInfoPost = async (req, res) => {
    try {
        const { phone, bio, address } = req.body;

        if (!phone || !bio || !address) {
            return res.status(400).json({
                success: false,
                message: "All Fields Must Be Required"
            });
        }

        const existingProfile = await userSchema.findOne({
            accountRef: req.user.id
        });

        if (existingProfile) {
            return res.status(409).json({
                success: false,
                message: "Profile Already Exists"
            });
        }

        const profile = await userSchema.create({
            phone,
            bio,
            address,
            accountRef: req.user.id
        });

        return res.status(201).json({
            success: true,
            message: "Profile Created Successfully",
            data: {
                id: profile._id,
                phone: profile.phone,
                bio: profile.bio,
                address: profile.address
            }
        });

    } catch (error) {
        console.error("Profile Create Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const UserInfoGet = async (req, res) => {
    try {
        const profile = await userSchema
            .findOne({
                accountRef: req.user.id
            })
            .populate("accountRef", "username email");

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            data: profile
        });

    } catch (error) {
        console.error("Profile Get Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export {
    UserInfoPost,
    UserInfoGet
};