import request from 'supertest';
import app from '../app';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'pass123', role: 'USER' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

});