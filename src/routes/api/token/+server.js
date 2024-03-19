export async function GET() {
  const tokenResponse = await fetch('https://answebapi.zutom.com:50055/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName: "woox_inter", password: "159WX*753in*" })
  });

  if (tokenResponse.ok) {
    const { token } = await tokenResponse.json();

    // Vytvoření cookie s tokenem
    return new Response(null, {
      status: 200, // nebo jiný odpovídající stav
      headers: {
        'Set-Cookie': `authToken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
      }
    });
  } else {
    return new Response('Nepodařilo se získat token', { status: 500 });
  }
}
