import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
  try {
    const response = await fetch(`https://parafarm-back.onrender.com/products/${id}`, { cache: 'no-store' }); // La URL de tu backend
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return NextResponse.json({data, error: false, message: 'Ok'});
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({data: null, error: true, message: 'Error fetching products'});
  }
}

export async function PATCH(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  
  try {
    const body = await req.json();  // Lee el cuerpo de la solicitud PATCH

    const response = await fetch(`https://parafarm-back.onrender.com/products/updateone/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),  // Pasa los datos a actualizar
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return NextResponse.json({ data, error: false, message: 'El producto se actualizo exitosamente' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ data: null, error: true, message: 'Error updating product' });
  }
}