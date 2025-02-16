import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
// import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import  AsyncHandler  from "../utils/handler/Async.handler.js";
import ApiResponse from "../utils/handler/ApiResponse.handler.js";
import ApiError from "../utils/handler/ApiError.handler.js";
import { generateToken } from "../utils/handler/generateToken.js";
export const register = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required.")   
    }
    const user = await User.findOne({ email });
    if (user) {
        throw new ApiError(400, "User already exist with this email.");  
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        name,
        email,
        password: hashedPassword
    });
    res.status(201).
        json(new ApiResponse(201, {}, "Account created successfully.")
        )
})

export const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            });
        }
        generateToken(res, user, `Welcome back ${user.name}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}
export const logout = async (_,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        }) 
    }
}
export const getUserProfile = async (req,res) => {
    try {
        console.log(req.id);
        const userId = req.id;
        const user = await User.findById(userId).select("-password")
        // .populate("enrolledCourses");
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to load user"
        })
    }
}
export const updateProfile = async (req,res) => {
    try {
        const userId = req.id;
        const {name} = req.body;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            }) 
        }
        const updatedData = {};
        if (name) updatedData.name = name;
        if (req.file) updatedData.photoUrl = req.file.path;

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to update profile"
        })
    }
}