import express from "express";
import dotenv from "dotenv";

// Initialize dotenv to use environment variables
dotenv.config();

const app = express();

// Define a route that handles GET requests
app.get("/", (req, res) => {
  res.send("Inside Scribe , World!");
});

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
