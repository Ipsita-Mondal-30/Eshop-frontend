'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Check if it's Admin signup
    if (email === 'admin@admin.com' && password === 'admin') {
      localStorage.setItem('isAdmin', 'true');
      setSuccess('Admin signup successful!');
      setTimeout(() => {
        router.push('/admin/add-product'); // Redirect to Admin Dashboard
      }, 2000);
      return;
    }

    // Handle user signup
    try {
      const response = await fetch(isLogin ? '/api/login' : '/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong.');
      } else {
        setSuccess(data.message);
        setTimeout(() => {
          router.push('/'); // Redirect to home or dashboard
        }, 2000);
      }
    } catch (err) {
      setError('Failed to process request. Try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="border p-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}

      <button
        className="mt-4 text-blue-500"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'New user? Sign up here' : 'Already signed up? Login here'}
      </button>
    </div>
  );
}
