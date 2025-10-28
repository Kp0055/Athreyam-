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

// Create Express app and HTTP server
const app = express();
const PORT = 5000;
const httpServer = createServer(app);

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:3000",          // Local React dev
  "https://athreyam.vercel.app",    // Production Vercel domain
];

// ✅ CORS for Express
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ CORS for Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// ✅ Socket connection handler
handleSocketConnection(io);

// ✅ Middlewares
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

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is live and connected to MongoDB!");
});

// ✅ Start server
httpServer.listen(PORT, () => {
  console.log(`✅ Server with Socket.IO running on port ${PORT}`);
});
