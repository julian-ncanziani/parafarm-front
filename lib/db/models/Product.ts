// lib/db/models/Product.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  product_id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id: string; // Asumiendo que es un ID de categoría
  image?: string;
  active: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    product_id: { type: String, required: false },
    name: { type: String, unique: true, required: true },
    description: { type: String, required: false },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    category_id: { 
      type: String, 
      ref: 'Category', 
      default: "66d8df62ebc4d378276899dd" // ID de categoría por defecto
    },
    image: { type: String, required: false },
    active: { type: Boolean, default: false },
  },
  { timestamps: true } // Agrega timestamps
);

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
