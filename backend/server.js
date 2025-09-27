import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.route.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import protectRoute from "./middleware/protectRoute.js";
dotenv.config();

const app = express();
app.use(express.json()); //to parse the req from json payload req.body, must be before routes
app.use(cookieParser()); //to parse the  cookies for jwt token , must be before routes
const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/messages", protectRoute, messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running on port ${PORT}`);
});
