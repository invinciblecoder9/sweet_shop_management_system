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
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  return { user: { id: user.id, email: user.email, role: user.role }, token };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  return { user: { id: user.id, email: user.email, role: user.role }, token };
}