import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import http from 'http';
import WebSocket from 'ws';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { VMManager } from './vm-manager.js';
import { AuthService } from './auth-service.js';
import { LicenseManager } from './license-manager.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Initialize managers
const vmManager = new VMManager();
const authService = new AuthService();
const licenseManager = new LicenseManager();

// Static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes
app.use('/api/auth', authService.getRouter());
app.use('/api/vms', vmManager.getRouter());
app.use('/api/license', licenseManager.getRouter());

// WebSocket for VM streaming
wss.on('connection', (ws: WebSocket) => {
  const sessionId = uuidv4();
  console.log(`[WS] Client connected: ${sessionId}`);

  ws.on('message', async (message: string) => {
    try {
      const data = JSON.parse(message);
      await handleWebSocketMessage(ws, data, sessionId);
    } catch (error) {
      console.error(`[WS] Error: ${error}`);
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    console.log(`[WS] Client disconnected: ${sessionId}`);
    vmManager.closeSession(sessionId);
  });

  ws.on('error', (error) => {
    console.error(`[WS] WebSocket error: ${error}`);
  });
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    platform: 'chrome-os-native',
  });
});

// Serve frontend
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// WebSocket message handler
async function handleWebSocketMessage(ws: WebSocket, data: any, sessionId: string) {
  const { type, vmId, command, payload } = data;

  switch (type) {
    case 'connect-vm':
      await vmManager.connectToVM(ws, vmId, sessionId);
      break;
    case 'vm-command':
      await vmManager.executeVMCommand(vmId, command, payload);
      break;
    case 'stream-start':
      await vmManager.startStreaming(ws, vmId, sessionId);
      break;
    case 'stream-stop':
      await vmManager.stopStreaming(sessionId);
      break;
    default:
      ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
  }
}

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n✅ Chrome OS VM Manager running on port ${PORT}`);
  console.log(`📍 Navigate to http://localhost:${PORT}`);
  console.log(`\n🎯 Features:`);
  console.log(`   • VM Management Dashboard`);
  console.log(`   • Chrome OS Native Interface`);
  console.log(`   • Lightweight & Fast`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});
