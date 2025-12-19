import express from "express";
import { logIn, refresh, signUp, logOut } from "../controllers/AuthController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()
router.post('/signup', signUp)
router.post('/login', logIn)
router.post('/refresh',refresh)
router.post('/logout',logOut)


router.get('/profile',protect, (req, res) => {
    res.json({ message: `Welcome to your profile, ${req.user.username}!` });
});

export default router;