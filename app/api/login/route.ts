import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Admin login
  if (email === 'admin@admin.com' && password === 'admin') {
    const username = "Admin"; // Admin username
    return NextResponse.json({ message: 'Login successful', username: username }, { status: 200 });
  }

  // User login (replace with your own logic if needed)
  if (email === 'user@user.com' && password === 'user') {
    const username = "User"; // Username
    return NextResponse.json({ message: 'Login successful', username: username }, { status: 200 });
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
