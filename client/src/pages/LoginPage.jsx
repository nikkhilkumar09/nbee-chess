import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin, signup, guestLogin } from '../services/authService';
import useAuthStore from '../store/useAuthStore';

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = isSignup ? await signup(form) : await signin(form);
      setAuth(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  const handleGuest = async () => {
    setError('');
    try {
      const data = await guestLogin();
      setAuth(data.user, data.token);
      navigate('/');
    } catch {
      setError('Guest login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-4">
      <div className="w-full max-w-sm bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
        <h1 className="text-2xl font-bold text-center">NBee Chess</h1>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignup && (
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2.5 rounded bg-gray-800 border border-gray-700 outline-none"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2.5 rounded bg-gray-800 border border-gray-700 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-2.5 rounded bg-gray-800 border border-gray-700 outline-none"
            required
          />
          <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded font-semibold cursor-pointer">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <button
          onClick={handleGuest}
          className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 rounded font-medium cursor-pointer"
        >
          Play as Guest
        </button>

        <p className="text-sm text-center text-gray-400">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-emerald-400 hover:underline cursor-pointer"
          >
            {isSignup ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
