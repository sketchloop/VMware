import React, { useState, useEffect } from 'react';

interface VM {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'paused' | 'error';
  memory: number;
  cpu: number;
  os: string;
  bootTime?: Date;
}

interface VMListProps {
  onSelectVM: (vmId: string) => void;
}

const VMList: React.FC<VMListProps> = ({ onSelectVM }) => {
  const [vms, setVMs] = useState<VM[]>([]);
  const [loading, setLoading] = useState(true);
  const [newVMName, setNewVMName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchVMs();
    const interval = setInterval(fetchVMs, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchVMs = async () => {
    try {
      const response = await fetch('/api/vms/list');
      const data = await response.json();
      if (data.success) {
        setVMs(data.vms);
      }
    } catch (error) {
      console.error('Failed to fetch VMs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVM = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/vms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newVMName }),
      });
      const data = await response.json();
      if (data.success) {
        setNewVMName('');
        setShowCreateForm(false);
        fetchVMs();
      }
    } catch (error) {
      console.error('Failed to create VM:', error);
    }
  };

  const handleStartVM = async (id: string) => {
    try {
      await fetch(`/api/vms/${id}/start`, { method: 'POST' });
      fetchVMs();
    } catch (error) {
      console.error('Failed to start VM:', error);
    }
  };

  const handleStopVM = async (id: string) => {
    try {
      await fetch(`/api/vms/${id}/stop`, { method: 'POST' });
      fetchVMs();
    } catch (error) {
      console.error('Failed to stop VM:', error);
    }
  };

  const handlePauseVM = async (id: string) => {
    try {
      await fetch(`/api/vms/${id}/pause`, { method: 'POST' });
      fetchVMs();
    } catch (error) {
      console.error('Failed to pause VM:', error);
    }
  };

  const handleDeleteVM = async (id: string) => {
    if (confirm('Are you sure you want to delete this VM?')) {
      try {
        await fetch(`/api/vms/${id}`, { method: 'DELETE' });
        fetchVMs();
      } catch (error) {
        console.error('Failed to delete VM:', error);
      }
    }
  };

  return (
    <div className="vm-list-container">
      <div className="vm-list-header">
        <h2>Virtual Machines</h2>
        <button
          className="btn-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          + New VM
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreateVM} className="create-vm-form">
          <input
            type="text"
            value={newVMName}
            onChange={(e) => setNewVMName(e.target.value)}
            placeholder="VM Name (e.g., Windows 10-1)"
            required
          />
          <button type="submit" className="btn-primary">
            Create
          </button>
          <button
            type="button"
            onClick={() => setShowCreateForm(false)}
            className="btn-secondary"
          >
            Cancel
          </button>
        </form>
      )}

      <div className="vm-grid">
        {loading ? (
          <p>Loading VMs...</p>
        ) : vms.length === 0 ? (
          <p>No VMs found. Create one to get started.</p>
        ) : (
          vms.map((vm) => (
            <div key={vm.id} className={`vm-card status-${vm.status}`}>
              <div className="vm-info">
                <h3>{vm.name}</h3>
                <p className={`status-badge ${vm.status}`}>
                  {vm.status.toUpperCase()}
                </p>
                <p>CPU: {vm.cpu} cores | RAM: {vm.memory / 1024}GB</p>
                <p className="vm-os">{vm.os}</p>
              </div>

              <div className="vm-actions">
                {vm.status === 'stopped' && (
                  <button
                    className="btn-success"
                    onClick={() => handleStartVM(vm.id)}
                  >
                    Start
                  </button>
                )}
                {vm.status === 'running' && (
                  <>
                    <button
                      className="btn-primary"
                      onClick={() => onSelectVM(vm.id)}
                    >
                      Console
                    </button>
                    <button
                      className="btn-warning"
                      onClick={() => handlePauseVM(vm.id)}
                    >
                      Pause
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleStopVM(vm.id)}
                    >
                      Stop
                    </button>
                  </>
                )}
                {vm.status === 'paused' && (
                  <>
                    <button
                      className="btn-success"
                      onClick={() => fetch(`/api/vms/${vm.id}/resume`, { method: 'POST' }).then(() => fetchVMs())}
                    >
                      Resume
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleStopVM(vm.id)}
                    >
                      Stop
                    </button>
                  </>
                )}
                <button
                  className="btn-danger-outline"
                  onClick={() => handleDeleteVM(vm.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VMList;
