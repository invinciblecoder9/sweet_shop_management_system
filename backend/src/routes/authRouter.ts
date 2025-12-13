import express from 'express';
import { register, login } from '../services/authService';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const result = await register(email, password, role);
    res.status(201).json(result);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const result = await login(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

export default router;