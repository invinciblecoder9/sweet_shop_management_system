import request from 'supertest';
import app from '../app';
import prisma from '../lib/prisma';

describe('Auth API', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'user@test.com', password: 'password123' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('user@test.com');
  });

  it('should login existing user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'login@test.com', password: 'pass123' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@test.com', password: 'pass123' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});