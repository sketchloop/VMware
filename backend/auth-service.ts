import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthToken {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export class AuthService {
  private router: Router;
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.JWT_SECRET || 'chrome-os-vm-secret-key';
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post('/login', this.login.bind(this));
    this.router.post('/register', this.register.bind(this));
    this.router.post('/verify', this.verify.bind(this));
    this.router.post('/logout', this.logout.bind(this));
  }

  private async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      // For Chrome OS demo mode - accept any credentials
      if (!username || !password) {
        res.status(400).json({ success: false, error: 'Missing credentials' });
        return;
      }

      const token = jwt.sign(
        {
          userId: username,
          role: 'user',
        },
        this.secretKey,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        token,
        user: { id: username, role: 'user' },
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Login failed' });
    }
  }

  private async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        res.status(400).json({ success: false, error: 'Missing required fields' });
        return;
      }

      const token = jwt.sign(
        {
          userId: username,
          role: 'user',
        },
        this.secretKey,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        token,
        user: { id: username, email, role: 'user' },
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Registration failed' });
    }
  }

  private async verify(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ success: false, error: 'No token provided' });
        return;
      }

      const decoded = jwt.verify(token, this.secretKey) as AuthToken;
      res.json({
        success: true,
        valid: true,
        user: decoded,
      });
    } catch (error) {
      res.status(401).json({ success: false, error: 'Invalid token' });
    }
  }

  private async logout(req: Request, res: Response): Promise<void> {
    res.json({ success: true, message: 'Logged out successfully' });
  }

  public getRouter(): Router {
    return this.router;
  }
}
