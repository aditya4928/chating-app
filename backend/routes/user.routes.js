import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar); // to get users for side bar

export default router;
