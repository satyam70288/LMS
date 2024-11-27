import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import connectDB from './Database/db.js';
import { errorConverter, errorHandler } from './middlewares/error.js';

dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5174', // Replace with your frontend's URL
    credentials: true,
}));

// Routes
app.use('/api/v1/user', userRoutes);

// Error Handling
app.use(errorConverter);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
