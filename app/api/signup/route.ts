export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Just simulate a successful signup for the user.
  return new Response(JSON.stringify({ message: 'Signup successful!' }), { status: 200 });
}
