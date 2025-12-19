import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updateUserLocation } from "../controllers/LocationController.js";

const router = express.Router()
router.post('/update-location', protect, updateUserLocation)




export default router;