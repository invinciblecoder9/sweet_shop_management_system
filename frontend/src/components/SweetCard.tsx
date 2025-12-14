import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import api from '../services/api';
import { toast } from 'react-toastify';
import { updateSweetQuantity } from '../features/sweetsSlice';

interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface Props {
  sweet: Sweet;
  onUpdate?: () => void;
}

export default function SweetCard({ sweet, onUpdate }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handlePurchase = async () => {
    try {
      const res = await api.post(`/sweets/${sweet.id}/purchase`);
      dispatch(updateSweetQuantity({ id: sweet.id, quantity: res.data.quantity }));
      toast.success('Purchased successfully! 🎉');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Out of stock!');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="bg-gradient-to-r from-primary to-secondary h-32 flex items-center justify-center">
        <span className="text-6xl">🍬</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{sweet.name}</h3>
        <p className="text-gray-600 mb-4">Category: {sweet.category}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-primary">${sweet.price.toFixed(2)}</span>
          <span className={`px-3 py-1 rounded-full text-sm ${sweet.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
          </span>
        </div>
        {user && (
          <button
            onClick={handlePurchase}
            disabled={sweet.quantity === 0}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              sweet.quantity > 0
                ? 'bg-primary text-white hover:bg-opacity-90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {sweet.quantity > 0 ? 'Purchase' : 'Sold Out'}
          </button>
        )}
      </div>
    </div>
  );
}