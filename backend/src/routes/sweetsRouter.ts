import express from 'express';
import { authenticate, adminOnly } from '../middleware/auth';
import * as sweetService from '../services/sweetService';

const router = express.Router();

router.use(authenticate); 

router.post('/', adminOnly, async (req, res) => {
  try {
    const { name, category, price, quantity = 0 } = req.body;
    const sweet = await sweetService.createSweet({ name, category, price, quantity });
    res.status(201).json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  const sweets = await sweetService.getAllSweets();
  res.json(sweets);
});

router.get('/search', async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const sweets = await sweetService.searchSweets({
    name: name as string,
    category: category as string,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });
  res.json(sweets);
});

router.put('/:id', adminOnly, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const sweet = await sweetService.updateSweet(id, req.body);
    res.json(sweet);
  } catch (error) {
    res.status(404).json({ message: 'Sweet not found' });
  }
});

router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await sweetService.deleteSweet(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Sweet not found' });
  }
});

router.post('/:id/purchase', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const sweet = await sweetService.purchaseSweet(id);
    res.json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/:id/restock', adminOnly, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Valid amount required' });

    const sweet = await sweetService.restockSweet(id, amount);
    res.json(sweet);
  } catch (error) {
    res.status(404).json({ message: 'Sweet not found' });
  }
});

export default router;