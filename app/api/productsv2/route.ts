// app/api/products/route.ts
import { NextResponse } from 'next/server';
import DB from '@/lib/db/db'; // Asegúrate de tener la clase DB configurada
import Product from '@/lib/db/models/Product';

// interfaces/IProduct.ts
export default interface IProduct {
    product_id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category_id: string;
    image?: string;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
export async function GET() {
  
  try {
    await DB.connect(); // Conéctate a la base de datos una sola vez
    const products: IProduct[] = await Product.find({ active: true }); // Obtén productos activos
    return NextResponse.json({ data: products, error: false, message: 'Ok' });
    } catch (error: any) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json({ message: error.message || 'Error al obtener productos', error: true, data: null }, { status: 500 });
    }
}

export async function POST(request: Request) {
  await DB.connect();

  try {
    const body = await request.json();
    const newProduct = new Product(body);
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return NextResponse.error();
  }
}
