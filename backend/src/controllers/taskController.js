const Task = require('../models/Task');

/**
 * Get all tasks
 */
const getAllTasks = (req, res, next) => {
  try {
    const tasks = Task.getAllTasks();
    res.status(200).json({
      success: true,
      data: tasks,
      message: `Retrieved ${tasks.length} task(s)`
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new task
 */
const createTask = (req, res, next) => {
  try {
    const { title } = req.body;

    const newTask = Task.createTask(title);

    res.status(201).json({
      success: true,
      data: newTask,
      message: 'Task created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a task (mark complete/incomplete or edit title)
 */
const updateTask = (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    // Find task
    const task = Task.getTaskById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Prepare updates
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (completed !== undefined) updates.completed = completed;

    // Update task
    const updatedTask = Task.updateTask(id, updates);

    res.status(200).json({
      success: true,
      data: updatedTask,
      message: 'Task updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a task
 */
const deleteTask = (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = Task.deleteTask(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: null,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};
