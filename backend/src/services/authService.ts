import prisma from '../lib/prisma';  
import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(email: string, password: string, role: Role = Role.USER) {
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, role },
  });
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '7d' }
  );
  return { user, token };
}