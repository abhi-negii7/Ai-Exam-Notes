import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";
import creditRouter from "./routes/credits.route.js";
import { stripeWebhook } from "./controllers/credits.controller.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Stripe Webhook Route
// express.raw() is required because Stripe needs the raw request body
// to verify the webhook signature.
app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);


// Enable CORS to allow requests from the frontend
// credentials: true allows cookies to be sent with requests.
app.use(
  cors({
    origin: " http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// Parse cookies attached to incoming requests
app.use(cookieParser());

// Register API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/credits", creditRouter);

// Default route to check whether the server is running
app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

// Start the server and establish database connection
app.listen(PORT, () => {
  console.log(`Server started at port http://localhost:${PORT}`);
  // Connect to MongoDB
  connectDb();
});
