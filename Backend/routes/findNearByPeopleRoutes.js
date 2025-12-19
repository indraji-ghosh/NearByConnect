import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { findNearbyPeople } from "../controllers/FindPeopleController.js";

const router = express.Router()
router.post('/find-people', protect, findNearbyPeople)




export default router;