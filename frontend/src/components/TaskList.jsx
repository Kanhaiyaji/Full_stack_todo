import TaskItem from './TaskItem';

/**
 * TaskList Component
 * Displays filtered list of tasks
 */
export default function TaskList({
  tasks,
  filter,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  loading
}) {
  // Filter tasks based on filter parameter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // 'all'
  });

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Create one to get started! 🚀</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No {filter} tasks. Great work! 🎉</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          loading={loading}
        />
      ))}
    </div>
  );
}
