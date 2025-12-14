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
    
    const data = Array.isArray(res.data) ? res.data : [];
    dispatch(setSweets(data));
  } catch (err: any) {
    console.error('Fetch sweets error:', err);
    toast.error('Failed to load sweets — check if backend is running');
    dispatch(setSweets([])); 
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

  const safeSweets = Array.isArray(sweets) ? sweets : [];

const filteredSweets = safeSweets.filter((sweet) => {
  const lowerSearch = search.toLowerCase();
  const matchesName = sweet.name.toLowerCase().includes(lowerSearch);
  const matchesCategory = sweet.category.toLowerCase().includes(lowerSearch);
  const maxPrice = parseFloat(search);
  const matchesPrice = isNaN(maxPrice) || sweet.price <= maxPrice;

  return matchesName || matchesCategory || matchesPrice;
});

  const openPurchaseHistory = () => {
    setShowHistory(true);
    fetchPurchaseHistory();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Hero Header with Avatar */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            {/* Cute Kawaii Candy Avatar */}
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-300 to-purple-400 rounded-full shadow-2xl flex items-center justify-center animate-pulse">
              <span className="text-6xl">🍭</span>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white px-6 py-2 rounded-full shadow-lg border-4 border-pink-200">
                <p className="text-sm font-semibold text-pink-600">Sweet Shop</p>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4 animate-fade-in">
            Welcome to the Sweetest Shop!
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover delicious treats and make every moment sweeter 🍬✨
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
          <div className="flex shadow-2xl rounded-2xl overflow-hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, category, or max price..."
              className="flex-1 px-8 py-5 text-lg focus:outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-5 font-bold hover:from-pink-600 hover:to-purple-700 transition transform hover:scale-105"
            >
              🔍 Search
            </button>
          </div>
        </form>

        {/* My Purchases Button */}
        <div className="text-center mb-12">
          <button
            onClick={openPurchaseHistory}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition transform"
          >
            <span className="text-2xl">📋</span>
            My Purchases
          </button>
        </div>

        {/* Sweets Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
            <p className="mt-6 text-2xl text-gray-700">Loading delicious sweets...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredSweets.map((sweet) => (
                <SweetCard key={sweet.id} sweet={sweet} />
              ))}
            </div>

            {filteredSweets.length === 0 && (
              <div className="text-center py-20">
                <span className="text-8xl mb-6 block">😢</span>
                <p className="text-3xl text-gray-700 font-semibold">
                  No sweets found...
                </p>
                <p className="text-xl text-gray-600 mt-4">
                  Try adjusting your search or ask the admin to add more treats!
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Purchase History Modal (unchanged from previous version) */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8">
              <h2 className="text-4xl font-bold text-center text-white">
                🍬 My Purchase History
              </h2>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto">
              {historyLoading ? (
                <p className="text-center text-lg">Loading your sweet memories...</p>
              ) : purchases.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-6xl block mb-4">🛍️</span>
                  <p className="text-xl text-gray-600">
                    No purchases yet. Time to treat yourself! 🍭
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {purchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-2xl border-2 border-pink-200 shadow-lg hover:shadow-xl transition"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            {purchase.sweetName}
                          </h3>
                          <p className="text-2xl font-bold text-pink-600 mt-2">
                            ${purchase.sweetPrice.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Purchased on</p>
                          <p className="text-lg font-semibold text-purple-700">
                            {new Date(purchase.purchasedAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 text-center">
              <button
                onClick={() => setShowHistory(false)}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
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