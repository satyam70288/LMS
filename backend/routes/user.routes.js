import express from "express";
import { getUserProfile, login, logout, register, updateProfile } from "../controller/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
// import upload from "../utils/multer.js";
import storage from "../utils/multer.js"
const router = express.Router();
const upload = storage('profile')
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

export default router;