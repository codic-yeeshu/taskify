const TaskModel = require("../Models/TaskModel");

const createTask = async (req, res) => {
  const data = req.body;
  const userId = req.user._id; // Get user ID from the authenticated user (from req.user)

  try {
    const model = new TaskModel({
      ...data,
      user: userId, // Assign the authenticated user's ID to the task
    });
    await model.save();
    res.status(201).json({ message: "Task is created", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", success: false });
  }
};

const fetchAllTasks = async (req, res) => {
  const userId = req.user._id; // Get the user ID from the authenticated user

  try {
    // Find all tasks that belong to the authenticated user
    const tasks = await TaskModel.find({ user: userId });
    res.status(200).json({ message: "All Tasks", success: true, data: tasks });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get all tasks", success: false });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    await TaskModel.findByIdAndUpdate(id, obj);
    res.status(200).json({ message: "Task Updated", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to updated task", success: false });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Task is deleted", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task", success: false });
  }
};

module.exports = {
  createTask,
  fetchAllTasks,
  updateTaskById,
  deleteTaskById,
};
