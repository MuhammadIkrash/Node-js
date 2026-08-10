import express from "express"
import StudentInfoSchema from "../Model/student.model.js"
import multer from "multer"
import path from "path"
import { getStudents, getSingleStudent, addStudent, updateStudent, deleteStudent } from "../Controllers/student.controller.js"
const router = express.Router()

const picStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    },
})
const profilePicFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error("Only Image File Are Allowed!"), false)
    }
}
const uploadPic = multer({
    storage: picStorage,
    fileFilter: profilePicFileFilter,
    limits: {
        fieldSize: 3 * 1024 * 1024
    }
})
// MiddleWare

// Api Routes

router.get('/', getStudents)
router.get('/:id', getSingleStudent)
router.post('/', uploadPic.single('Profile_Pic'), addStudent)
router.put('/:id',uploadPic.single('Profile_Pic'), updateStudent)
router.delete('/:id', deleteStudent)

export default router