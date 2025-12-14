import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import api from '../services/api';
import SweetCard from '../components/SweetCard';
import { toast } from 'react-toastify';
import { setSweets } from '../features/sweetsSlice';
import { setPurchases } from '../features/purchaseHistorySlice';

interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface Purchase {
  id: number;
  sweetName: string;
  sweetPrice: number;
  purchasedAt: string;
}

export default function DashboardPage() {
  const dispatch = useDispatch();
  const sweets = useSelector((state: RootState) => state.sweets.list);
  const purchases = useSelector((state: RootState) => state.purchases.list);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async (query = '') => {
    setLoading(true);
    try {
      const endpoint = query ? `/sweets/search?name=${query}` : '/sweets';
      const res = await api.get(endpoint);
      dispatch(setSweets(res.data));
    } catch (err) {
      toast.error('Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchaseHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await api.get('/sweets/my-purchases');
      dispatch(setPurchases(res.data));
    } catch (err) {
      toast.error('Failed to load purchase history');
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSweets(search);
  };


  const filteredSweets = sweets.filter((sweet) => {
    const matchesCategory = sweet.category.toLowerCase().includes(search.toLowerCase());
    const maxPrice = parseFloat(search);
    const matchesPrice = isNaN(maxPrice) || sweet.price <= maxPrice;
    const matchesName = sweet.name.toLowerCase().includes(search.toLowerCase());

    return matchesName || matchesCategory || matchesPrice;
  });

  const openPurchaseHistory = () => {
    setShowHistory(true);
    fetchPurchaseHistory();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Available Sweets
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
          <div className="flex">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, category, or max price..."
              className="flex-1 px-6 py-3 rounded-l-lg border border-r-0 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-r-lg hover:bg-opacity-90 transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* My Purchases Button */}
        <div className="text-center mb-10">
          <button
            onClick={openPurchaseHistory}
            className="bg-secondary text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-opacity-90 transition transform hover:-translate-y-1"
          >
            📋 My Purchases
          </button>
        </div>

        {/* Sweets Grid */}
        {loading ? (
          <div className="text-center text-2xl text-gray-700">Loading sweets...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredSweets.map((sweet) => (
                <SweetCard key={sweet.id} sweet={sweet} />
              ))}
            </div>

            {filteredSweets.length === 0 && (
              <p className="text-center text-2xl text-gray-600 mt-16">
                No sweets found 😢
              </p>
            )}
          </>
        )}
      </div>

      {/* Purchase History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-8 border-b">
              <h2 className="text-3xl font-bold text-center text-gray-800">
                My Purchase History
              </h2>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto">
              {historyLoading ? (
                <p className="text-center text-lg">Loading history...</p>
              ) : purchases.length === 0 ? (
                <p className="text-center text-lg text-gray-600">
                  No purchases yet. Buy something sweet! 🍬
                </p>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase: any) => (
                    <div
                      key={purchase.id}
                      className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {purchase.sweetName}
                          </h3>
                          <p className="text-lg text-primary font-bold mt-1">
                            ${purchase.sweetPrice.toFixed(2)}
                          </p>
                        </div>
                        <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                          {new Date(purchase.purchasedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t text-center">
              <button
                onClick={() => setShowHistory(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}