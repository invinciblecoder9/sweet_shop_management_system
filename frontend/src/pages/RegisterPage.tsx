import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Join the Sweetness 🍭</h2>
        <RegisterForm />
        <p className="text-center mt-8 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}