const { v4: uuidv4 } = require('uuid');

/**
 * In-memory task storage
 * In production, this would be a database
 */
class TaskStore {
  constructor() {
    this.tasks = [];
  }

  generateId() {
    return uuidv4();
  }

  /**
   * Create a new task
   * @param {string} title - Task title
   * @returns {Object} Created task
   */
  createTask(title) {
    const task = {
      id: this.generateId(),
      title,
      completed: false,
      createdAt: new Date()
    };
    this.tasks.push(task);
    return task;
  }

  /**
   * Get all tasks
   * @returns {Array} All tasks
   */
  getAllTasks() {
    return this.tasks;
  }

  /**
   * Get task by ID
   * @param {string} id - Task ID
   * @returns {Object|null} Task or null if not found
   */
  getTaskById(id) {
    return this.tasks.find(task => task.id === id) || null;
  }

  /**
   * Update task
   * @param {string} id - Task ID
   * @param {Object} updates - Fields to update
   * @returns {Object|null} Updated task or null if not found
   */
  updateTask(id, updates) {
    const task = this.getTaskById(id);
    if (!task) return null;

    Object.assign(task, updates);
    return task;
  }

  /**
   * Delete task
   * @param {string} id - Task ID
   * @returns {boolean} True if deleted, false if not found
   */
  deleteTask(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  /**
   * Clear all tasks (for testing)
   */
  clearAll() {
    this.tasks = [];
  }
}

// Export singleton instance
module.exports = new TaskStore();
