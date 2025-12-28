const List = require("../models/List");
const Task = require("../models/Task");

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createList = async (req, res) => {
  try {
    const { title } = req.body;
    const list = new List({
      title,
      user: req.user._id,
    });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    console.error("Create List Error:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateList = async (req, res) => {
  try {
    const { title } = req.body;
    const list = await List.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title },
      { new: true }
    );
    if (!list) return res.status(404).json({ message: "List not found" });
    res.json(list);
  } catch (error) {
    console.error("Update List Error:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const list = await List.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!list) return res.status(404).json({ message: "List not found" });
    
    // Delete all tasks associated with this list
    await Task.deleteMany({ list: req.params.id });
    
    res.json({ message: "List deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
