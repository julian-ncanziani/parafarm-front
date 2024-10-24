// lib/db/index.ts
import mongoose from 'mongoose';

class DB {
  private static isConnected: boolean = false;

  static async connect() {
    if (this.isConnected) {
      return;
    }
    
    try {
      if(!process.env.MONGODB_URI) throw('No existe URI MONGODB');
      await mongoose.connect(process.env.MONGODB_URI);
      this.isConnected = true;
      console.log('Conexión a la base de datos establecida');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      throw error;
    }
  }
}

export default DB;
