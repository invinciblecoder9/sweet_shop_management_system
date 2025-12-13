import prisma from '../lib/prisma';

export async function createSweet(data: { name: string; category: string; price: number; quantity?: number }) {
  return prisma.sweet.create({ data });
}

export async function getAllSweets() {
  return prisma.sweet.findMany();
}

export async function searchSweets(query: {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  return prisma.sweet.findMany({
    where: {
      AND: [
        query.name ? { name: { contains: query.name, mode: 'insensitive' } } : {},
        query.category ? { category: { equals: query.category, mode: 'insensitive' } } : {},
        query.minPrice ? { price: { gte: query.minPrice } } : {},
        query.maxPrice ? { price: { lte: query.maxPrice } } : {},
      ],
    },
  });
}

export async function updateSweet(id: number, data: Partial<{ name: string; category: string; price: number; quantity: number }>) {
  return prisma.sweet.update({ where: { id }, data });
}

export async function deleteSweet(id: number) {
  return prisma.sweet.delete({ where: { id } });
}

export async function purchaseSweet(id: number) {
  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet || sweet.quantity <= 0) {
    throw new Error('Out of stock');
  }
  return prisma.sweet.update({
    where: { id },
    data: { quantity: { decrement: 1 } },
  });
}

export async function restockSweet(id: number, amount: number) {
  return prisma.sweet.update({
    where: { id },
    data: { quantity: { increment: amount } },
  });
}