import express from "express";
import storage from "../utils/multer.js"
const router = express.Router();
const upload= storage("lecture")
router.route("/upload-video").post(upload.single("file"), async (req, res) => {
  try {
    // Log the uploaded file information
    console.log(req.file);

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Define the file URL based on the saved file path in the public directory
    // const fileUrl = `/uploads/videos/${file.filename}`; // Assuming file is saved under 'public/uploads/videos/'

    // Return success response with the file URL and filename
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        fileUrl: file.path, // URL to access the file in the public folder
        fileName: file.filename, // File name
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading file" });
  }
});

export default router;
