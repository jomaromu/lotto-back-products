import { Response, Request } from "express";
const mongoose = require("mongoose");

import productModel from "../models/product-model";
import { productDB } from "../interfaces/product-interface";

export class ProductClass {
  async nuevoProducto(req: any, resp: Response): Promise<any> {
    try {
      const nombre: string = req.body.nombre;
      const precio: number = req.body.precio;
      const estado: boolean = req.body.estado;
      const digitos: number = req.body.digitos;

      const crearProducto = new productModel({
        nombre,
        precio,
        estado,
        digitos,
      });

      const productDB = await crearProducto.save();

      if (productDB) {
        return resp.json({
          ok: true,
          productDB,
        });
      } else {
        return resp.json({
          ok: false,
          mensaje: "Error al crear producto",
        });
      }
    } catch (error) {
      console.log(error);

      return resp.json({
        ok: false,
        mensaje: "Error al crear producto",
        err: error,
      });
    }
  }

  async obtenerProducto(req: any, resp: Response): Promise<any> {
    try {
      const _id: any = new mongoose.Types.ObjectId(req.get("_id"));

      const productDB = await productModel
        .findById<productDB | null>(_id)
        .exec();

      if (productDB) {
        return resp.json({
          ok: true,
          productDB,
        });
      } else {
        return resp.json({
          ok: false,
          mensaje: "Error al obtener el producto",
        });
      }
    } catch (error) {
      return resp.json({
        ok: false,
        mensaje: "Error al obtener el poducto",
        err: error,
      });
    }
  }

  async obtenerProductos(req: any, resp: Response): Promise<any> {
    try {
      const productsDB = await productModel
        .find<null | Array<productDB>>()
        .exec();

      if (productsDB) {
        return resp.json({
          ok: true,
          productsDB,
        });
      } else {
        return resp.json({
          ok: false,
          mensaje: "Error al obtener los productos",
        });
      }
    } catch (error) {
      return resp.json({
        ok: false,
        mensaje: "Error al obtener los productos",
        err: error,
      });
    }
  }

  async editarProducto(req: any, resp: Response) {
    try {
      const _id = new mongoose.Types.ObjectId(req.body._id);

      const nombre: string = req.body.nombre;
      const precio: number = req.body.precio;
      const estado: boolean = req.body.estado;
      const digitos: number = req.body.digitos;

      const query: productDB = {
        nombre,
        precio,
        estado,
        digitos,
      };

      const productsDB = await productModel
        .findByIdAndUpdate<null | Array<productDB>>({ _id }, query, {
          new: true,
        })
        .exec();

      if (productsDB) {
        return resp.json({
          ok: true,
          productsDB,
        });
      } else {
        return resp.json({
          ok: false,
          mensaje: "Error al actualizar producto",
        });
      }
    } catch (error) {
      return resp.json({
        ok: false,
        mensaje: "Error al actualizar producto",
        err: error,
      });
    }
  }

  async eliminarProducto(req: any, resp: Response): Promise<any> {
    try {
      const _id = new mongoose.Types.ObjectId(req.get("_id"));

      const productDB = await productModel.findByIdAndDelete<productDB | null>(
        _id
      );

      if (productDB) {
        return resp.json({
          ok: true,
          mensaje: "Producto eliminado",
        });
      } else {
        return resp.json({
          ok: false,
          mensaje: "Error al eliminar producto",
        });
      }
    } catch (error) {
      return resp.json({
        ok: false,
        mensaje: "Error al eliminar producto",
        err: error,
      });
    }
  }
}
