/*  import { json } from '@sveltejs/kit';

// Funkce pro získání tokenu
async function getToken() {
  // API URL a tělo požadavku
  const url = 'https://answebapi.zutom.com:50055/api/token';
  const body = JSON.stringify({
    userName: "woox_inter",
    password: "159WX*753in*"
  });

  // Nastavení hlaviček
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error('Error fetching token:', error);
    return json({ error: error.message }, { status: 500 });
  }
}

export const GET = async () => {
  return await getToken();
}; */



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
    // Ošetření chyby, pokud se nepodaří získat token
    return new Response('Nepodařilo se získat token', { status: 500 });
  }
}
