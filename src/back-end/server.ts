import express from "express";
import connectDB from "./config/dbConnect";
import userRoutes from "./routes/UserRoutes";
import productRoutes from "./routes/ProductRoutes";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3003;

// Add Middleware
app.use(express.json());

// Add routes
app.use("/", userRoutes);
app.use("/", productRoutes);

// Connect to server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
