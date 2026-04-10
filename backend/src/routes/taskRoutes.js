const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const {
  validateTaskTitle,
  validateTaskId,
  validateTaskUpdate
} = require('../middlewares/validation');

/**
 * GET /api/tasks
 * Retrieve all tasks
 */
router.get('/', getAllTasks);

/**
 * POST /api/tasks
 * Create a new task
 * Body: { title: string }
 */
router.post('/', validateTaskTitle, createTask);

/**
 * PATCH /api/tasks/:id
 * Update a task (mark complete/incomplete or edit title)
 * Body: { title?: string, completed?: boolean }
 */
router.patch('/:id', validateTaskId, validateTaskUpdate, updateTask);

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
router.delete('/:id', validateTaskId, deleteTask);

module.exports = router;
