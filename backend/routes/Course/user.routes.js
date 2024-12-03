import express from "express";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import {  
    getPublishedCourse
} from "../../controller/course.controller.js";
import storage from "../../utils/multer.js"

const router = express.Router();
const upload = storage('course')

// router.route("/search").get(isAuthenticated, searchCourse);
router.route("/published-courses").get( getPublishedCourse);

export default router;