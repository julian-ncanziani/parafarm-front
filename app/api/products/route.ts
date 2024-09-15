// app/api/products/route.ts
import IProduct from '@/interfaces/IProduct';
import { NextResponse } from 'next/server';

// El handler que maneja la solicitud GET
export async function GET() {
  try {
    const response = await fetch('https://parafarm-back.onrender.com/products', { cache: 'no-store' });

    if (!response.ok) {
      throw(`Error fetching products: ${response.url} ${response.status} ${response.statusText}`);
    }
    const data: IProduct[] = await response.json();
    return NextResponse.json({data, error: false, message: 'Ok'});
    
  } catch (error) {    
    return NextResponse.json({ message: error, error: true, data: null }, { status: 500 });
  }
}