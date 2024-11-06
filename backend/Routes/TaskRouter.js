const express = require("express");
const {
  createTask,
  fetchAllTasks,
  updateTaskById,
  deleteTaskById,
} = require("../Controllers/TaskController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/", authenticate, createTask);
router.get("/", authenticate, fetchAllTasks);
router.put("/:id", authenticate, updateTaskById);
router.delete("/:id", authenticate, deleteTaskById);

module.exports = router;
