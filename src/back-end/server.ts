import express from "express";
import connectDB from "./config/dbConnect";
import userRoutes from "./routes/UserRoutes";

const app = express();
const PORT = process.env.PORT || 3003;

// Add Middleware
app.use(express.json());

// Add routes
app.use("/", userRoutes);

// Connect to server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
