import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import passport from "./controller/passport";
import userRoutes from "./routers/UserRouter/router";
import docRouter from "./routers/DocRouter/router";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import { Server } from "socket.io";
import { createServer } from "http";
import { handleSocketConnection } from "./socket";

dotenv.config();
connectDB();

const app = express();
const PORT = 5000;
const httpServer = createServer(app);

// ✅ CORS (must come BEFORE any other middleware)
app.use(
  cors({
    origin: ["https://api.athreyam.shop", "http://localhost:3000"],
    credentials: true,
  })
);

// ✅ JSON & Cookie parsers
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

// ✅ Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI as string,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// ✅ Passport setup
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api", userRoutes);
app.use("/api", docRouter);

// ✅ Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: ["https://api.athreyam.shop", "http://localhost:3000"],
    credentials: true,
  },
});
handleSocketConnection(io);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is live on EC2 and connected to MongoDB!");
});

// ✅ Start server
httpServer.listen(PORT, () => {
  console.log(`✅ Server with Socket.IO running on http://localhost:${PORT}`);
});
