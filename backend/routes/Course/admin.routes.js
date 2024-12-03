import express from "express";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import {
    createCourse, getCreatorCourses,editCourse,
    getCourseById,
    createLecture,
    getCourseLecture,
    editLecture,
    removeLecture,
    getLectureById,
    togglePublishCourse,
    getPublishedCourse
} from "../../controller/course.controller.js";
import storage from "../../utils/multer.js"

const router = express.Router();
const upload = storage('course')

router.route("/").post(isAuthenticated, createCourse);
// router.route("/search").get(isAuthenticated, searchCourse);
// router.route("/published-courses").get( getPublishedCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseId").put( upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(upload.single("video"),isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);


export default router;