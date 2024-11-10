const express = require("express");
const app = express();
require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 8080;
const TaskRouter = require("./Routes/TaskRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./Models/userModel");

app.get("/", (req, res) => {
  res.send("Hello from the server");
});
app.use(cors());
app.use(bodyParser.json());
app.use("/tasks", TaskRouter);

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body; // Include name and email
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword }); // Use both name and email
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});
// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body; // Include name and email
  try {
    // You can choose to allow login by either name or email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
});

app.post("/verify-token", (req, res) => {
  const token = req.body.token;
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, userId: decoded.id });
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(401).json({ valid: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT=${PORT}`);
});
