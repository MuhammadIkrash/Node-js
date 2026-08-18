import { body, validationResult } from "express-validator"

const filterError = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = errors.array()[0]
            return res.status(400).json({
                success: false,
                message: error.msg,
                path: error.path
            })
        }
        next()
    } catch (error) {
        console.error("Internal Server Error:", error.message);
        // FIX: Prevent frontend from hanging if validation crashes
        return res.status(500).json({
            success: false,
            message: "Validation framework error"
        });
    }
};

const signupValidation =
    // for email
    [body('email')
        .notEmpty()
        .withMessage("Email Felid Must Be Required")
        .isEmail()
        .withMessage('Please Provide a valid email address')
        .normalizeEmail()
        .trim(),
    //    for username
    body('username')
        .trim()
        .notEmpty()
        .withMessage("username must be required")
        .isLength({ min: 3, max: 20 })
        .withMessage("username Must be Between 3 to 20 Character")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers, and underscores')
        .escape(),
    // for password
    body("password")
        .notEmpty()
        .withMessage("Password felid must be required")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char."),
        filterError
    ]

const signinValidation = [
    // for email
    body('email')
        .notEmpty()
        .withMessage("Email Felid Must Be Required")
        .isEmail()
        .withMessage('Please Provide a valid email address')
        .normalizeEmail()
        .trim(),
    // Password
    body("password")
        .notEmpty()
        .withMessage("Password felid must be required"),
    filterError
]

export { signupValidation, signinValidation }