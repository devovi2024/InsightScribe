import express from "express";
import dotenv from "dotenv";

// Initialize dotenv to use environment variables
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Inside Scribe , World!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
