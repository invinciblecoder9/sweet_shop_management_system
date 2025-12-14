import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import api from '../services/api';
import SweetCard from '../components/SweetCard';
import { toast } from 'react-toastify';
import { setSweets } from '../features/sweetsSlice'; // Import setSweets

interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export default function DashboardPage() {
  const dispatch = useDispatch();
  const sweets = useSelector((state: RootState) => state.sweets.list); // Use Redux state
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async (query = '') => {
    setLoading(true);
    try {
      const endpoint = query ? `/sweets/search?name=${query}` : '/sweets';
      const res = await api.get(endpoint);
      dispatch(setSweets(res.data)); // Dispatch to Redux
    } catch (err) {
      toast.error('Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSweets(search);
  };

  // Optional: Add category/price filter (simple example)
  const filteredSweets = sweets.filter(sweet =>
    sweet.category.toLowerCase().includes(search.toLowerCase()) || // Category filter
    sweet.price <= (parseFloat(search) || Infinity) // Price range (simple max price filter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Available Sweets</h1>

        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
          <div className="flex">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, category, or max price..."
              className="flex-1 px-6 py-3 rounded-l-lg border border-r-0 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-r-lg hover:bg-opacity-90"
            >
              Search
            </button>
          </div>
        </form>

        {loading ? (
          <div className="text-center text-2xl">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSweets.map((sweet) => (
              <SweetCard key={sweet.id} sweet={sweet} />
            ))}
          </div>
        )}

        {filteredSweets.length === 0 && !loading && (
          <p className="text-center text-2xl text-gray-600 mt-12">No sweets found 😢</p>
        )}
      </div>
    </div>
  );
}