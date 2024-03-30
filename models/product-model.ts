import mongoose from "mongoose";
import { Product } from "../interfaces/product-interface";

// Crear esquema
const Schema = mongoose.Schema;

const productSchema = new Schema({
  nombre: { type: String, unique: true },
  precio: { type: Number },
  estado: { type: Boolean, default: true },
  digitos: { type: Number },
});

export = mongoose.model<Product>("product", productSchema);
