import { useAuth } from '../context/AuthContext';
import { TaskList } from '../components/Task/TaskList';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Hello, {currentUser.email}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>
      <main>
        <TaskList userId={currentUser.uid} />
      </main>
    </div>
  );
}