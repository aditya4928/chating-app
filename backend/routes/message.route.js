import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages); //get messages between current user and the id we passed
router.post("/send/:id", protectRoute, sendMessage); // current user and id: of receiver end have to specify

export default router;
