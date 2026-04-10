/**
 * API Service for Task Manager
 * Handles all communication with the backend
 */

const API_BASE = 'http://localhost:5000/api';

/**
 * Fetch all tasks from the server
 * @returns {Promise<Array>} Array of tasks
 */
export const fetchTasks = async () => {
  const response = await fetch(`${API_BASE}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const result = await response.json();
  return result.data;
};

/**
 * Create a new task on the server
 * @param {string} title - Task title
 * @returns {Promise<Object>} Created task object
 */
export const createTask = async (title) => {
  const response = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create task');
  }

  const result = await response.json();
  return result.data;
};

/**
 * Update a task (mark complete/incomplete or edit title)
 * @param {string} id - Task ID
 * @param {Object} updates - { completed?: boolean, title?: string }
 * @returns {Promise<Object>} Updated task object
 */
export const updateTask = async (id, updates) => {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update task');
  }

  const result = await response.json();
  return result.data;
};

/**
 * Delete a task
 * @param {string} id - Task ID
 * @returns {Promise<void>}
 */
export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete task');
  }
};

/**
 * Check if the API server is running
 * @returns {Promise<boolean>}
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE.replace('/api', '')}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
};
