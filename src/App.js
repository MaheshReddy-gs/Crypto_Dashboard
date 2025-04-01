import React, { useEffect } from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  // Initialize dark mode from localStorage on app startup
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Dashboard />
    </div>
  );
};

export default App;