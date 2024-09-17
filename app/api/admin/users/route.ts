// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://parafarm-back.onrender.com/users', { cache: 'no-store' }); // La URL de tu backend
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return NextResponse.json({data, error: false, message: 'Ok'});
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({data: null, error: true, message: 'Error fetching usuarios'});
  }
}
