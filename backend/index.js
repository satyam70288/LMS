import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import courseRoute from "./routes/Course/index.js";
import connectDB from './Database/db.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import path from 'path'
dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();
const __dirname = path.resolve();
console.log(path.join(__dirname, 'public'))

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5174', // Replace with your frontend's URL
    credentials: true,
}));
app.use(cookieParser());
// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/v1/user', userRoutes);
app.use("/api/v1/course", courseRoute);

// Error Handling
app.use(errorConverter);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
