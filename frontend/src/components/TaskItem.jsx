import { useState } from 'react';

/**
 * TaskItem Component
 * Displays individual task with edit, complete, and delete actions
 */
export default function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  loading
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editError, setEditError] = useState('');

  const handleToggleComplete = () => {
    onToggleComplete(task.id, !task.completed);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task.id);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError('');

    if (!editTitle.trim()) {
      setEditError('Title cannot be empty');
      return;
    }

    try {
      await onEditTask(task.id, editTitle);
      setIsEditing(false);
    } catch (err) {
      setEditError(err.message || 'Failed to edit task');
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditError('');
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-input"
            autoFocus
            maxLength={500}
          />
          <div className="edit-actions">
            <button type="submit" className="btn btn-small btn-success" disabled={loading}>
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-small btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
          {editError && <div className="error-message">{editError}</div>}
        </form>
      ) : (
        <div className="task-content">
          <div className="task-header">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              disabled={loading}
              className="task-checkbox"
            />
            <span className="task-title">{task.title}</span>
          </div>
          <div className="task-meta">
            <small>{new Date(task.createdAt).toLocaleDateString()}</small>
          </div>
          <div className="task-actions">
            <button
              onClick={handleToggleComplete}
              className={`btn btn-small ${task.completed ? 'btn-secondary' : 'btn-success'} btn-done`}
              disabled={loading}
            >
              {task.completed ? 'Undo' : 'Done'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-small btn-secondary"
              disabled={loading}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-small btn-danger"
              disabled={loading}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
