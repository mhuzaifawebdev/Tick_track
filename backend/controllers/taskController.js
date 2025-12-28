const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const query = { user: req.user._id };
    if (req.query.listId) {
      query.list = req.query.listId;
    }
    const tasks = await Task.find(query).sort({ createdAt: -1 }).populate("list", "title");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, listId } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      list: listId,
      user: req.user._id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
