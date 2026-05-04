import { log } from "console";
import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {
    criar: async (req, res) => {
        try {
            const { nome, idCategoria} = req.body;
            const valor = Number(req.body.valor);
            const vinculoImagem = `uploads/images${req.file.filename}`;
            const produto = Produto.criar({ nome, idCategoria, valor, vinculoImagem});
            const result = await produtoRepository.criar(produto);
            res.status(201).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    atualizar: async (req, res) => {
        try {
            const id = Number(req.query.id);
            const { nome, idCategoria, valor} = req.body;
            const vinculoImagem = `uploads/images${req.file.filename}`;
            const produto = Produto.editar({nome, idCategoria, valor, vinculoImagem}, id);
            const result = await produtoRepository.editar(produto);
            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await produtoRepository.deletar(id);
            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    selecionar: async (req, res) => {
        try {
            const result = await produtoRepository.selecionar();
            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    }
}

export default produtoController;