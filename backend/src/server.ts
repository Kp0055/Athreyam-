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

// ✅ Setup Socket.IO on the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  },
});

// ✅ Socket connection handler
handleSocketConnection(io);

// ✅ Middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));



// ✅ Session setup
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI as string,
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// ✅ Passport setup
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api", userRoutes);
app.use("/api", docRouter);

// ✅ Start HTTP server (for both Express and Socket.IO)
httpServer.listen(PORT, () => {
  console.log(`✅ Server with Socket.IO running on http://localhost:${PORT}`);
});
