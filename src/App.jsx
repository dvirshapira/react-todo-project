import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import './App.css';

// LocalStorage key for persisting tasks
const STORAGE_KEY = 'todos';

/**
 * App Component - Main Container
 * Manages global state, LocalStorage sync, and renders all child components
 */
function App() {
  // ============ State ============
  // Lazy initialization: Load tasks directly from LocalStorage
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState('all');

  // ============ LocalStorage Effects ============

  // Save tasks to LocalStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ============ CRUD Handlers ============

  // Create: Add a new task
  const handleAddTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now()
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Update: Toggle task completion status
  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Update: Edit task text
  const handleEditTask = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // Delete: Remove a task
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Delete: Clear all completed tasks
  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // Delete: Remove ALL tasks (with confirmation)
  const handleDeleteAll = () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את כל המשימות?')) {
      setTasks([]);
    }
  };

  // Update: Mark all tasks as completed
  const handleMarkAllCompleted = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, completed: true }))
    );
  };

  // ============ Filter Handler ============
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // ============ Derived State ============

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  // Count active and completed tasks
  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  // ============ Render ============
  return (
    <div className="app-container rtl">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">📝 Todo List</h1>
        <p className="app-subtitle">רשימת משימות / Task Manager</p>
      </header>

      {/* Main Card */}
      <main className="card">
        {/* Task Input */}
        <TaskInput onAddTask={handleAddTask} />

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />

        {/* Filter Bar - only show if there are tasks */}
        {tasks.length > 0 && (
          <FilterBar
            filter={filter}
            onFilterChange={handleFilterChange}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={handleClearCompleted}
            onDeleteAll={handleDeleteAll}
            onMarkAllCompleted={handleMarkAllCompleted}
          />
        )}
      </main>
    </div>
  );
}

export default App;
