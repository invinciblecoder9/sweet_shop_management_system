import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import api from '../services/api';
import { toast } from 'react-toastify';
import SweetCard from '../components/SweetCard';
import { setSweets } from '../features/sweetsSlice'; // Import to refresh list

interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export default function AdminPage() {
  const dispatch = useDispatch();
  const sweets = useSelector((state: RootState) => state.sweets.list); // Use Redux state
  const { user } = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState({ name: '', category: '', price: '', quantity: '0' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (user?.role === 'ADMIN') fetchSweets();
  }, [user]);

  const fetchSweets = async () => {
    try {
      const res = await api.get('/sweets');
      dispatch(setSweets(res.data)); // Dispatch to Redux
    } catch (err) {
      toast.error('Failed to load sweets');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      };
      if (editingId) {
        await api.put(`/sweets/${editingId}`, payload);
        toast.success('Updated!');
      } else {
        await api.post('/sweets', payload);
        toast.success('Added new sweet!');
      }
      setForm({ name: '', category: '', price: '', quantity: '0' });
      setEditingId(null);
      fetchSweets(); // Refresh
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        await api.delete(`/sweets/${id}`);
        toast.success('Deleted');
        fetchSweets(); // Refresh
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  const handleRestock = async (id: number) => {
    const amountStr = prompt('Restock amount:');
    const amount = Number(amountStr);
    if (amount && amount > 0) {
      try {
        await api.post(`/sweets/${id}/restock`, { amount });
        toast.success('Restocked!');
        fetchSweets(); // Refresh
      } catch (err) {
        toast.error('Restock failed');
      }
    }
  };

  if (user?.role !== 'ADMIN') return <div className="text-center text-3xl mt-20">Access Denied</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Admin Panel</h1>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit' : 'Add New'} Sweet</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-4 py-3 border rounded-lg"
            />
            <input
              required
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-3 border rounded-lg"
            />
            <input
              required
              type="number"
              step="0.01"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="px-4 py-3 border rounded-lg"
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="flex-1 px-4 py-3 border rounded-lg"
              />
              <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg">
                {editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sweets.map((sweet) => (
            <div key={sweet.id} className="bg-white rounded-xl shadow-lg p-6">
              <SweetCard sweet={sweet} />
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(sweet.id);
                    setForm({
                      name: sweet.name,
                      category: sweet.category,
                      price: sweet.price.toString(),
                      quantity: sweet.quantity.toString(),
                    });
                  }}
                  className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRestock(sweet.id)}
                  className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Restock
                </button>
                <button
                  onClick={() => handleDelete(sweet.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}