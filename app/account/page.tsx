'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (stored in localStorage for now)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Hello, {user}!</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Sign Up
            </button>
          </div>
        </>
      )}
    </div>
  );
}
