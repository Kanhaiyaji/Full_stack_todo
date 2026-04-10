import { useState } from 'react';

/**
 * AddTaskForm Component
 * Handles adding new tasks
 */
export default function AddTaskForm({ onAddTask, loading }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    try {
      await onAddTask(title);
      setTitle(''); // Clear input after successful submission
    } catch (err) {
      setError(err.message || 'Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        disabled={loading}
        maxLength={500}
        className="task-input"
      />
      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? 'Adding...' : 'Add Task'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}
