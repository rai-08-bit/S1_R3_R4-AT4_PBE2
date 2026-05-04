import axios from "axios";
import { Pedido } from "../models/Pedido.js";
import { ItensPedido } from "../models/ItensPedido.js";
import pedidoRepository from "../repositories/pedidoRepository.js";
import { statusPedido } from "../enum/statusPedido.js";

const pedidoController = {
    criar: async (req, res) => {
        try {
            let { clienteId, itens } = req.body;

            
            
            const itensPedido = itens.map(item =>
                ItensPedido.criar({
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    valorItem: item.valorItem
                })
            )
            
            const subTotalItens = ItensPedido.calcularSubTotal(itensPedido); // => Criar método para calcular
            const pedido = Pedido.criar({ clienteId, subTotalItens, status:statusPedido.ABERTO });
            
            const result = await pedidoRepository.criar(pedido, itensPedido);
            res.status(201).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    criarItemPed: async (req, res) => {
        try {
            const idPed = Number(req.params.id);
            const { item } = req.body;

            const novoItem = ItensPedido.criar( idPed, {
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    valorItem: item.valorItem
                })

            const subTotalItens = ItensPedido.calcularSubTotal(novoItem);
            const result = await pedidoRepository.criarItemPed(idPed, novoItem, subTotalItens);
            res.status(201).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    atualizarItemPed: async (req, res) => {
        try {
            const id = Number(req.body.id);
            let { quantidade, valorItem } = req.body;

            const itemPedAtual = await pedidoRepository.selecionarPorId(id);

            const itemPed = ItensPedido.editar({
                pedidoId: itemPedAtual.pedidoId,
                produtoId: itemPedAtual.produtoId,
                quantidade: quantidade,
                valorItem: valorItem,
                id: id
             });
            const result = await pedidoRepository.editarItemPed(itemPed, id);
            res.status(201).json({ result });


        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            })
        }
    },
    atualizarStatus: async (req, res) => {
        try {
            const id = Number(req.body.id);
            const { status } = req.body;
            console.log(req.body);

            const pedidoAtual = await pedidoRepository.selecionarPorId(id);
            
            const novoPedido = Pedido.editar({
                clienteId: pedidoAtual.clienteId, 
                subTotalItens: pedidoAtual.subTotalItens, 
                status: status, 
                id: pedidoAtual.id
            });
            
            const result = await pedidoRepository.editarStatus(status, id);
            
            res.status(201).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            })
        }
    },
    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await pedidoRepository.deletarItemPed(id);
            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    selecionar: async (req, res) => {
        try {
            const result = await pedidoRepository.selecionar();
            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    }
}

export default pedidoController;