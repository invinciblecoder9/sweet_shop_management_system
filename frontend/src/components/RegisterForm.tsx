import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/authSlice';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps = {}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await api.post('/auth/register', {
        email: data.email,
        password: data.password,
      });
      dispatch(setCredentials(res.data));
      toast.success('Account created successfully! 🎊');
      if (onSuccess) onSuccess();
      else navigate('/');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <input
          {...register('email', { required: 'Email is required' })}
          type="email"
          placeholder="Email"
          className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-primary/30"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
          type="password"
          placeholder="Password"
          className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-primary/30"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <input
          {...register('confirmPassword', {
            validate: value => value === watch('password') || 'Passwords do not match'
          })}
          type="password"
          placeholder="Confirm Password"
          className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-primary/30"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition shadow-lg"
      >
        Create Account
      </button>
    </form>
  );
}