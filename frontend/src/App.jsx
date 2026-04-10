import { useEffect, useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  checkHealth
} from './services/api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'
  const [serverOnline, setServerOnline] = useState(true);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
    checkServer();
  }, []);

  /**
   * Fetch tasks from server
   */
  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      setServerOnline(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Check if server is online
   */
  const checkServer = async () => {
    const online = await checkHealth();
    setServerOnline(online);
  };

  /**
   * Add new task
   */
  const handleAddTask = async (title) => {
    setLoading(true);
    setError('');
    try {
      const newTask = await createTask(title);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle task completion status
   */
  const handleToggleComplete = async (id, completed) => {
    setError('');
    try {
      const updatedTask = await updateTask(id, { completed });
      setTasks(
        tasks.map(task => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Edit task title
   */
  const handleEditTask = async (id, title) => {
    setError('');
    try {
      const updatedTask = await updateTask(id, { title });
      setTasks(
        tasks.map(task => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Delete task
   */
  const handleDeleteTask = async (id) => {
    setError('');
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Calculate statistics
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Task Manager</h1>
        <p className="subtitle">Stay organized and productive</p>
      </header>

      <main className="app-main">
        {/* Server status warning */}
        {!serverOnline && (
          <div className="warning">
            ⚠️ Cannot connect to server. Please make sure the backend is running on port 5000.
            <button onClick={checkServer} className="btn btn-small">
              Retry
            </button>
          </div>
        )}

        {/* Error messages */}
        {error && (
          <div className="error-banner">
            ❌ {error}
            <button
              onClick={() => setError('')}
              className="btn-close"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}

        {/* Add new task */}
        <section className="section">
          <h2>Add New Task</h2>
          <AddTaskForm onAddTask={handleAddTask} loading={loading} />
        </section>

        {/* Filter buttons */}
        <section className="section">
          <h2>Tasks</h2>
          <div className="filter-buttons">
            <button
              onClick={() => setFilter('all')}
              className={`btn ${filter === 'all' ? 'btn-active' : 'btn-secondary'}`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setFilter('incomplete')}
              className={`btn ${filter === 'incomplete' ? 'btn-active' : 'btn-secondary'}`}
            >
              Incomplete ({totalCount - completedCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`btn ${filter === 'completed' ? 'btn-active' : 'btn-secondary'}`}
            >
              Completed ({completedCount})
            </button>
          </div>
        </section>

        {/* Task list */}
        <section className="section">
          {loading && tasks.length === 0 ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <TaskList
              tasks={tasks}
              filter={filter}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              loading={loading}
            />
          )}
        </section>

        {/* Task statistics */}
        {tasks.length > 0 && (
          <section className="section">
            <div className="progress-card">
              <div className="progress-header">
                <span>Overall Progress</span>
                <strong>{progressPercentage}%</strong>
              </div>
              <div className="progress-bar" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
              </div>
            </div>
            <div className="stats">
              <div className="stat">
                <span className="stat-label">Total Tasks:</span>
                <span className="stat-value">{totalCount}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Completed:</span>
                <span className="stat-value">{completedCount}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Progress:</span>
                <span className="stat-value">{progressPercentage}%</span>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>Task Manager v1.0 | Built with React & Node.js</p>
        <p>By Kanhaiya</p>
      </footer>
    </div>
  );
}
