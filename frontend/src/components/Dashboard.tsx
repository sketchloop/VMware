import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalVMs: 0,
    runningVMs: 0,
    stoppedVMs: 0,
    memory: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/vms/list');
      const data = await response.json();

      if (data.success) {
        const vms = data.vms;
        setStats({
          totalVMs: vms.length,
          runningVMs: vms.filter((v: any) => v.status === 'running').length,
          stoppedVMs: vms.filter((v: any) => v.status === 'stopped').length,
          memory: vms.reduce((sum: number, v: any) => sum + v.memory, 0),
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total VMs</h3>
          <p className="stat-value">{stats.totalVMs}</p>
        </div>
        <div className="stat-card running">
          <h3>Running</h3>
          <p className="stat-value">{stats.runningVMs}</p>
        </div>
        <div className="stat-card stopped">
          <h3>Stopped</h3>
          <p className="stat-value">{stats.stoppedVMs}</p>
        </div>
        <div className="stat-card">
          <h3>Total Memory</h3>
          <p className="stat-value">{stats.memory / 1024}GB</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Getting Started</h3>
        <ol>
          <li>Go to Virtual Machines tab</li>
          <li>Select a VM or create a new one</li>
          <li>Click "Start" to boot the VM</li>
          <li>Use Console to access the VM</li>
          <li>Click "Stop" when done</li>
        </ol>
      </div>

      <div className="dashboard-section">
        <h3>Features</h3>
        <ul>
          <li>✅ Create and manage multiple Windows 10 VMs</li>
          <li>✅ Web-based RDP streaming</li>
          <li>✅ Start, stop, pause, and resume VMs</li>
          <li>✅ Monitor VM status in real-time</li>
          <li>✅ Chrome OS optimized interface</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
