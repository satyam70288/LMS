import express from "express";
import adminRoutes from "./admin.routes.js";
// import studentRoutes from "./user.routes.js";

const CourseRoutes = express.Router();

// Route organization
CourseRoutes.use("/admin", adminRoutes); // Routes related to admin
// CourseRoutes.use("/student", studentRoutes); // Routes related to students

export default CourseRoutes;
