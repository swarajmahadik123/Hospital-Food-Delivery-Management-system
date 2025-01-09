import express from 'express';
import { register, login, verifyLogin } from "../controllers/authController.js";


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/verify", verifyLogin);

export default router;
