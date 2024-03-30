import { Router, Request, Response } from "express";
import { ProductClass } from "../class/product-class";

// instanciar el router
const productRoutes = Router();

// Crear producto
productRoutes.post("/new-product", (req: Request, resp: Response) => {
  const nuevoProducto = new ProductClass();
  nuevoProducto.nuevoProducto(req, resp);
});

// Obtener producto
productRoutes.get("/get-product", (req: Request, resp: Response) => {
  const obtenerProducto = new ProductClass();
  obtenerProducto.obtenerProducto(req, resp);
});

// Obtener productos
productRoutes.get("/get-products", (req: Request, resp: Response) => {
  const obtenerProductos = new ProductClass();
  obtenerProductos.obtenerProductos(req, resp);
});

// Editar producto
productRoutes.put("/edit-product", (req: Request, resp: Response) => {
  const editarProducto = new ProductClass();
  editarProducto.editarProducto(req, resp);
});

// Eliminar producto
productRoutes.delete("/delete-product", (req: Request, resp: Response) => {
  const eliminarProducto = new ProductClass();
  eliminarProducto.eliminarProducto(req, resp);
});

export default productRoutes;
