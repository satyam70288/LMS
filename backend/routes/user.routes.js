import express from 'express';
import { login, register } from '../controller/user.controller.js'
const router = express.Router();

router.post('/register', register);  // register a new user
router.post('/login', login);  // login a user

export default router;