import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { logout } from '../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          {/* Left: App Logo with Cute Avatar */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition transform">
                <span className="text-4xl animate-bounce">🍭</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-4 border-white shadow-md"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-wide">
                Sweet Shop
              </h1>
              <p className="text-pink-100 text-sm opacity-90">Your Candy Paradise</p>
            </div>
          </Link>

          {/* Right: User Actions */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {/* Greeting with Avatar */}
                <div className="flex items-center space-x-4 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white border-opacity-30">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-white">
                    <p className="text-sm opacity-80">Welcome back</p>
                    <p className="font-semibold text-lg">{user.email}</p>
                    {user.role === 'ADMIN' && (
                      <span className="inline-block bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full mt-1">
                        ★ ADMIN ★
                      </span>
                    )}
                  </div>
                </div>

                {/* Admin Panel Button */}
                {user.role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    className="bg-white text-purple-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:bg-opacity-90 transition transform hover:scale-105 flex items-center gap-2"
                  >
                    <span className="text-xl">🛠️</span>
                    Admin Panel
                  </Link>
                )}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex items-center gap-2"
                >
                  <span className="text-xl">🚪</span>
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Guest Links */}
                <Link
                  to="/login"
                  className="text-white font-semibold text-lg hover:text-pink-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-purple-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}