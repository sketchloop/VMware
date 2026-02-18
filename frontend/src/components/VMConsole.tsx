import React, { useState, useEffect } from 'react';

interface VMConsoleProps {
  vmId: string;
}

const VMConsole: React.FC<VMConsoleProps> = ({ vmId }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [streamActive, setStreamActive] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws) ws.close();
    };
  }, [vmId]);

  const connectWebSocket = () => {
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}`;
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        setConnected(true);
        socket.send(JSON.stringify({ type: 'connect-vm', vmId }));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'connected') {
          startStreaming(socket);
        }
      };

      socket.onerror = () => {
        setError('WebSocket connection failed');
        setConnected(false);
      };

      socket.onclose = () => {
        setConnected(false);
        setStreamActive(false);
      };

      setWs(socket);
    } catch (err) {
      setError('Failed to connect to VM');
    }
  };

  const startStreaming = (socket: WebSocket) => {
    socket.send(JSON.stringify({ type: 'stream-start', vmId }));
    setStreamActive(true);
  };

  const stopStreaming = () => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'stream-stop', vmId }));
      setStreamActive(false);
    }
  };

  return (
    <div className="vm-console">
      <h2>VM Console - {vmId}</h2>

      <div className="console-status">
        <span className={`status-indicator ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? '● Connected' : '● Disconnected'}
        </span>
        {error && <span className="error-message">{error}</span>}
      </div>

      <div className="console-viewer">
        {streamActive ? (
          <div className="rdp-stream">
            <iframe
              title="VM Stream"
              src={`/stream/${vmId}`}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        ) : (
          <div className="console-placeholder">
            <p>🎥 RDP Stream Placeholder</p>
            <p>VM Console will appear when streaming is active</p>
            {connected && (
              <button
                className="btn-primary"
                onClick={() => startStreaming(ws!)}
              >
                Start Streaming
              </button>
            )}
          </div>
        )}
      </div>

      <div className="console-controls">
        {streamActive && (
          <>
            <button
              className="btn-warning"
              onClick={stopStreaming}
            >
              Stop Streaming
            </button>
          </>
        )}
        <button
          className="btn-secondary"
          onClick={() => {
            if (ws) ws.close();
            connectWebSocket();
          }}
        >
          Reconnect
        </button>
      </div>
    </div>
  );
};

export default VMConsole;
