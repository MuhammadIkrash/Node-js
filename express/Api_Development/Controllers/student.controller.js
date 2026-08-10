import mongoose from "mongoose";
import StudentInfoSchema from "../Model/student.model.js"
import fs from "fs"
import path from "path";

// Get All Student
const getStudents = async (req, res) => {
    try {
        const allStudents = await StudentInfoSchema.find();
        return res.status(200).json({
            success: true,
            message: "Get All Student Info Data",
            studentsData: allStudents
        });

    } catch (error) {
        console.error("DataBase FetchError", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error . Please Try Again"
        })

    }
}
// Get Single Student
const getSingleStudent = async (req, res) => {
    try {
        const { id } = req.params
        const isStudentIdValid = mongoose.Types.ObjectId.isValid(id)
        if (!isStudentIdValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid Student ID"
            })
        }
        const findSingleStudent = await StudentInfoSchema.findById(id)
        if (!findSingleStudent) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Student Found Successful",
            singleStudentData: findSingleStudent
        })
    } catch (error) {
        console.error("DataBase FetchError", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error . Please Try Again"
        })

    }
}
// Add Student
const addStudent = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, address, gender } = req.body
        if (!first_name || !last_name || !email || !phone || !address || !gender) {
            if (req.file) {
                const filePath = path.join('uploads/', req.file.filename)
                fs.unlink(filePath, (err) => {
                    if (err) console.log("Failed To Delete", err);
                })
            }
            return res.status(400).json({
                success: false,
                message: "All Required Fields Must Bee Fill"
            })
        }
        const isEmailExist = await StudentInfoSchema.findOne({ email })
        if (isEmailExist) {
            if (req.file) {
                const filePath = path.join('uploads/', req.file.filename)
                fs.unlink(filePath, (err) => {
                    if (err) console.log("Failed To Delete", err);
                })
            }
            return res.status(409).json({
                success: false,
                message: "User With This Email Already Exists"
            })
        }
        const studentAdd = {
            first_name,
            last_name,
            email,
            phone,
            address,
            gender
        }
        if (req.file) {
            studentAdd.Profile_Pic = req.file.filename
        }
        const addStudent = await StudentInfoSchema.create(studentAdd)
        return res.status(201).json({
            success: true,
            message: "User Create Successful",
            studentData: addStudent
        })
    } catch (error) {
        console.error("DataBase FetchError", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error . Please Try Again"
        })

    }
}
// Update Single Student
const updateStudent = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, address, gender } = req.body
        if (!first_name || !last_name || !email || !phone || !address || !gender) {
            if (req.file) {
                const filePath = path.join('uploads/', req.file.filename)
                fs.unlink(filePath, (err) => {
                    if (err) console.log("Failed To Delete", err);
                })
            }
            return res.status(400).json({
                success: false,
                message: "All Required Fields Must Bee Fill"
            })
        }
        const { id } = req.params
        const isStudentIdValid = mongoose.Types.ObjectId.isValid(id)
        if (!isStudentIdValid) {
            if (req.file) {
                const filePath = path.join('uploads/', req.file.filename)
                fs.unlink(filePath, (err) => {
                    if (err) console.log("Failed To Delete", err);
                })
            }
            return res.status(400).json({
                success: false,
                message: "Invalid Student ID"
            })
        }
        const isEmailExist = await StudentInfoSchema.findOne({ email, _id: { $ne: id } })
        if (isEmailExist) {
            if (req.file) {
                const filePath = path.join('uploads/', req.file.filename)
                fs.unlink(filePath, (err) => {
                    if (err) console.log("Failed To Delete", err);
                })
            }
            return res.status(409).json({
                success: false,
                message: "User With This Email Already Exists"
            })
        }
        const isExist = await StudentInfoSchema.findById(id)
        if (!isExist) {
            if (req.file) {
                const filePath = path.join('uploads/', req.file.filename)
                fs.unlink(filePath, (err) => {
                    if (err) console.log("Failed To Delete Image", err);
                })
            }
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            })
        }
        const updateStudentDocument = { first_name, last_name, email, phone, address, gender }
        if (req.file) {
            if (isExist.Profile_Pic) {
                const oldPicDelete = path.join('uploads/', isExist.Profile_Pic)
                fs.unlink(oldPicDelete, (err) => {
                    if (err) console.log("Failed To Update Old Image", err);
                })
            }
            updateStudentDocument.Profile_Pic = req.file.filename
        }
        const updateStudent = await StudentInfoSchema.findByIdAndUpdate(id, updateStudentDocument, {
            returnDocument: "after",
            runValidators: true
        })

        return res.status(200).json({
            success: true,
            message: "User Update Successful",
            updateStudentData: updateStudent
        })
    } catch (error) {
        console.error("DataBase FetchError", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error . Please Try Again"
        })

    }
}
// Delete Single Student
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params
        const isStudentIdValid = mongoose.Types.ObjectId.isValid(id)
        if (!isStudentIdValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid Student ID"
            })
        }
        const deleteStudent = await StudentInfoSchema.findByIdAndDelete(id)
        if (!deleteStudent) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            })
        }
        if (deleteStudent.Profile_Pic) {
            const filePath = path.join('uploads/', deleteStudent.Profile_Pic)
            fs.unlink(filePath, (err) => {
                if (err) console.log("Failed To Delete", err);
            })
        }
        return res.status(200).json({
            success: true,
            message: "User Delete Successful"
        })
    } catch (error) {
        console.error("DataBase FetchError", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error . Please Try Again"
        })

    }
}
export {
    getStudents,
    getSingleStudent,
    addStudent,
    updateStudent,
    deleteStudent
}