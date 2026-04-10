/**
 * Validation middleware for task inputs
 */

/**
 * Validate task title for POST/PATCH requests
 */
const validateTaskTitle = (req, res, next) => {
  const { title } = req.body;

  if (title === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }

  if (typeof title !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Title must be a string'
    });
  }

  if (title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Title cannot be empty'
    });
  }

  // Trim and validate length
  if (title.length > 500) {
    return res.status(400).json({
      success: false,
      message: 'Title must be less than 500 characters'
    });
  }

  // Clean and pass trimmed title
  req.body.title = title.trim();
  next();
};

/**
 * Validate task ID parameter
 */
const validateTaskId = (req, res, next) => {
  const { id } = req.params;

  if (id === undefined || id === null) {
    return res.status(400).json({
      success: false,
      message: 'Task ID is required'
    });
  }

  if (typeof id !== 'string' || id.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID'
    });
  }

  req.params.id = id.trim();
  next();
};

/**
 * Validate PATCH payload for task updates
 * Allows: { title?: string, completed?: boolean }
 */
const validateTaskUpdate = (req, res, next) => {
  const { title, completed } = req.body;

  if (title === undefined && completed === undefined) {
    return res.status(400).json({
      success: false,
      message: 'At least one field (title or completed) is required'
    });
  }

  if (title !== undefined) {
    if (typeof title !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Title must be a string'
      });
    }

    if (title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Title cannot be empty'
      });
    }

    if (title.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Title must be less than 500 characters'
      });
    }

    req.body.title = title.trim();
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({
      success: false,
      message: 'Completed must be a boolean'
    });
  }

  next();
};

module.exports = {
  validateTaskTitle,
  validateTaskId,
  validateTaskUpdate
};
