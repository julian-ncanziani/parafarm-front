// app/api/users/route.ts
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://parafarm-back.onrender.com/products', { cache: 'no-store' }); // La URL de tu backend
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


export interface updatemanyproductsBody {
  productIds: string[];
  active?: boolean;
  price?: {
    amount: number,
    percentaje: boolean,
  }
}

export async function PATCH(req: Request) {
  try {
    const body: updatemanyproductsBody = await req.json();
    const response = await axios.patch('https://parafarm-back.onrender.com/products/updatemany', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.statusText)
    const data = response.data;
    return NextResponse.json({data: data, error: false, message: 'productos updateados ok'});
  } catch (error) {
    //console.error(error);
    return NextResponse.json({data: null, error: true, message: 'Error updateing products'});
  }
}