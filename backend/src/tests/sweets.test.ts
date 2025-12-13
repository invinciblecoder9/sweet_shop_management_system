import request from 'supertest';
import app from '../app';
import prisma from '../lib/prisma';

let adminToken: string;
let userToken: string;

describe('Sweets API', () => {
  beforeAll(async () => {
    await prisma.sweet.deleteMany();
    await prisma.user.deleteMany();

    const adminRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'admin@test.com', password: 'admin123', role: 'ADMIN' });
    adminToken = adminRes.body.token;

    const userRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'user@test.com', password: 'user123' });
    userToken = userRes.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a sweet (admin only)', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Chocolate Bar', category: 'Chocolate', price: 2.99, quantity: 50 });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Chocolate Bar');
  });

  it('should get all sweets', async () => {
    const res = await request(app)
      .get('/api/sweets')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should purchase a sweet', async () => {
    const sweet = await prisma.sweet.create({
      data: { name: 'Gummy Bears', category: 'Candy', price: 3.49, quantity: 10 },
    });

    const res = await request(app)
      .post(`/api/sweets/${sweet.id}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(9);
  });
});