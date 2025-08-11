import { useEffect, useState } from 'react';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/tasks';

export function TaskList({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTasks() {
      try {
        const tasks = await getTasks(userId);
        setTasks(tasks);
      } catch (err) {
        setError('Failed to load tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      loadTasks();
    }
  }, [userId]);

  async function handleAddTask(taskData) {
    try {
      await createTask(taskData, userId);
      const updatedTasks = await getTasks(userId);
      setTasks(updatedTasks);
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
    }
  }

  async function handleUpdateTask(taskId, updates) {
    try {
      await updateTask(taskId, updates);
      const updatedTasks = await getTasks(userId);
      setTasks(updatedTasks);
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(taskId);
      const updatedTasks = await getTasks(userId);
      setTasks(updatedTasks);
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  }

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Tasks</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="mb-8">
        <TaskForm onSubmit={handleAddTask} />
      </div>
      
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet. Add one above!</p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}