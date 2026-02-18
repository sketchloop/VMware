import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import VMList from './components/VMList';
import VMConsole from './components/VMConsole';
import Auth from './components/Auth';

interface User {
  id: string;
  role: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'vms' | 'console'>('dashboard');
  const [selectedVM, setSelectedVM] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (data.valid) {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCurrentView('dashboard');
  };

  if (isLoading) {
    return <div className="loading">Initializing Chrome OS VM Manager...</div>;
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🖥️ Chrome OS VM Manager</h1>
          <nav className="nav">
            <button
              className={currentView === 'dashboard' ? 'active' : ''}
              onClick={() => setCurrentView('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={currentView === 'vms' ? 'active' : ''}
              onClick={() => setCurrentView('vms')}
            >
              Virtual Machines
            </button>
            {selectedVM && (
              <button
                className={currentView === 'console' ? 'active' : ''}
                onClick={() => setCurrentView('console')}
              >
                Console
              </button>
            )}
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'vms' && (
          <VMList
            onSelectVM={(vmId) => {
              setSelectedVM(vmId);
              setCurrentView('console');
            }}
          />
        )}
        {currentView === 'console' && selectedVM && (
          <VMConsole vmId={selectedVM} />
        )}
      </main>

      <footer className="app-footer">
        <p>Chrome OS VM Manager v1.0.0 | Optimized for Chrome OS</p>
      </footer>
    </div>
  );
};

export default App;
