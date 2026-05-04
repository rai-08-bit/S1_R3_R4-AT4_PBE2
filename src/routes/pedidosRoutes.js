import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const pedidoRoutes = Router();

pedidoRoutes.post('/', pedidoController.criar);
pedidoRoutes.post('/:id', pedidoController.criarItemPed);
pedidoRoutes.put('/', pedidoController.atualizarStatus);
pedidoRoutes.get('/', pedidoController.selecionar);
pedidoRoutes.delete('/:id', pedidoController.deletar);

export default pedidoRoutes;