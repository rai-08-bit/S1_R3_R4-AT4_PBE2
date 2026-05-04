import { Router } from "express";
const routes = Router();

import categoriaRoutes from "./categoriasRoutes.js";
import produtoRoutes from "./produtosRoutes.js";
import clienteRoutes from "./clientesRoutes.js";
import pedidoRoutes from "./pedidosRoutes.js";

routes.use('/categorias', categoriaRoutes);
routes.use('/produtos', produtoRoutes);
routes.use('/clientes', clienteRoutes);
routes.use('/pedidos', pedidoRoutes);

export default routes;