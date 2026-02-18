import { Router, Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface VMInstance {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'paused' | 'error';
  memory: number;
  cpu: number;
  os: string;
  bootTime?: Date;
  ip?: string;
  rdpPort?: number;
}

export class VMManager {
  private vms: Map<string, VMInstance> = new Map();
  private sessions: Map<string, any> = new Map();
  private router: Router;
  private apiBase: string;

  constructor() {
    this.router = Router();
    this.apiBase = process.env.VM_API_BASE || 'http://vm-backend:5000';
    this.setupRoutes();
    this.initializeDefaultVMs();
  }

  private setupRoutes(): void {
    this.router.get('/list', this.listVMs.bind(this));
    this.router.post('/create', this.createVM.bind(this));
    this.router.post('/:id/start', this.startVM.bind(this));
    this.router.post('/:id/stop', this.stopVM.bind(this));
    this.router.post('/:id/pause', this.pauseVM.bind(this));
    this.router.post('/:id/resume', this.resumeVM.bind(this));
    this.router.get('/:id/status', this.getVMStatus.bind(this));
    this.router.delete('/:id', this.deleteVM.bind(this));
    this.router.get('/:id/console', this.getConsole.bind(this));
  }

  private initializeDefaultVMs(): void {
    // Initialize with default Windows 10 VM template
    const defaultVM: VMInstance = {
      id: uuidv4(),
      name: 'Windows 10 Pro',
      status: 'stopped',
      memory: 4096,
      cpu: 2,
      os: 'windows-10-pro',
    };
    this.vms.set(defaultVM.id, defaultVM);
  }

  private async listVMs(req: Request, res: Response): Promise<void> {
    try {
      const vmArray = Array.from(this.vms.values());
      res.json({
        success: true,
        vms: vmArray,
        total: vmArray.length,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to list VMs' });
    }
  }

  private async createVM(req: Request, res: Response): Promise<void> {
    try {
      const { name, memory = 4096, cpu = 2, os = 'windows-10-pro' } = req.body;

      const vm: VMInstance = {
        id: uuidv4(),
        name,
        status: 'stopped',
        memory,
        cpu,
        os,
      };

      this.vms.set(vm.id, vm);

      res.json({
        success: true,
        vm,
        message: `VM "${name}" created successfully`,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to create VM' });
    }
  }

  private async startVM(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vm = this.vms.get(id);

      if (!vm) {
        res.status(404).json({ success: false, error: 'VM not found' });
        return;
      }

      vm.status = 'running';
      vm.bootTime = new Date();
      vm.ip = `192.168.1.${Math.floor(Math.random() * 254) + 2}`;
      vm.rdpPort = 3389;

      res.json({
        success: true,
        vm,
        message: `VM "${vm.name}" started successfully`,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to start VM' });
    }
  }

  private async stopVM(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vm = this.vms.get(id);

      if (!vm) {
        res.status(404).json({ success: false, error: 'VM not found' });
        return;
      }

      vm.status = 'stopped';
      delete vm.bootTime;
      delete vm.ip;
      delete vm.rdpPort;

      res.json({
        success: true,
        vm,
        message: `VM "${vm.name}" stopped successfully`,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to stop VM' });
    }
  }

  private async pauseVM(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vm = this.vms.get(id);

      if (!vm) {
        res.status(404).json({ success: false, error: 'VM not found' });
        return;
      }

      vm.status = 'paused';

      res.json({
        success: true,
        vm,
        message: `VM "${vm.name}" paused successfully`,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to pause VM' });
    }
  }

  private async resumeVM(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vm = this.vms.get(id);

      if (!vm) {
        res.status(404).json({ success: false, error: 'VM not found' });
        return;
      }

      vm.status = 'running';

      res.json({
        success: true,
        vm,
        message: `VM "${vm.name}" resumed successfully`,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to resume VM' });
    }
  }

  private async getVMStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vm = this.vms.get(id);

      if (!vm) {
        res.status(404).json({ success: false, error: 'VM not found' });
        return;
      }

      res.json({
        success: true,
        vm,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to get VM status' });
    }
  }

  private async deleteVM(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vm = this.vms.get(id);

      if (!vm) {
        res.status(404).json({ success: false, error: 'VM not found' });
        return;
      }

      this.vms.delete(id);

      res.json({
        success: true,
        message: `VM "${vm.name}" deleted successfully`,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to delete VM' });
    }
  }

  private async getConsole(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vm = this.vms.get(id);

      if (!vm) {
        res.status(404).json({ success: false, error: 'VM not found' });
        return;
      }

      res.json({
        success: true,
        console: {
          vmId: id,
          vmName: vm.name,
          rdpConnection: vm.rdpPort ? `${vm.ip}:${vm.rdpPort}` : null,
          status: vm.status,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to get console' });
    }
  }

  public async connectToVM(ws: any, vmId: string, sessionId: string): Promise<void> {
    const vm = this.vms.get(vmId);
    if (vm && vm.status === 'running') {
      this.sessions.set(sessionId, { vmId, ws, connected: true });
      ws.send(JSON.stringify({ type: 'connected', vmId, sessionId }));
    }
  }

  public async executeVMCommand(vmId: string, command: string, payload: any): Promise<void> {
    console.log(`Executing command on VM ${vmId}: ${command}`);
  }

  public async startStreaming(ws: any, vmId: string, sessionId: string): Promise<void> {
    ws.send(JSON.stringify({ type: 'stream-started', vmId, sessionId }));
  }

  public async stopStreaming(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
  }

  public closeSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  public getRouter(): Router {
    return this.router;
  }
}
