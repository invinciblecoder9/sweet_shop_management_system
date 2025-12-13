import express from 'express';
import { register } from '../services/authService'; 

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, role = 'USER' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const { user, token } = await register(email, password, role as any);

    res.status(201).json({ user: { id: user.id, email: user.email, role: user.role }, token });
  } catch (error: any) {
    if (error.code === 'P2002') { 
      return res.status(409).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;