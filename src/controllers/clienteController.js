import axios from "axios";
import { Cliente } from "../models/Cliente.js";
import { Endereco } from "../models/Endereco.js";
import { Telefone } from "../models/Telefone.js";
import clienteRepository from "../repositories/clienteRepository.js";
import { limparNumero } from "../utils/limparNumero.js";
import { validarCPF } from "../utils/validarCpf.js";

const clienteController = {
    criar: async (req, res) => {
        try {
            let { nome, cpf, numero, cep, numCasa, complemento} = req.body;

            
            cpf = limparNumero(cpf);
            cpf = validarCPF(cpf);

            cep = limparNumero(cep);
            numero = limparNumero(numero);


            let resp = await viaCep(cep)
            
            const cliente = Cliente.criar({ nome, cpf });

            const endereco = Endereco.criar({
                cep,
                logradouro: resp.logradouro,
                bairro: resp.bairro,
                numero: numCasa,
                complemento: complemento,
                cidade: resp.localidade,
                uf: resp.uf,
            });

            const telefone = Telefone.criar({ numero });
            console.log(telefone.numero);
            

            const result = await clienteRepository.criar(cliente, telefone, endereco);
            res.status(201).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    atualizar: async (req, res) => {
        try {
            const id = Number(req.query.id);
            let { nome, cpf, numTelefone, cep, numCasa } = req.body;
            ;
            
            cpf = limparNumero(cpf);
            cep = limparNumero(cep);
            numTelefone = limparNumero(numTelefone);

            let resp = await viaCep(cep)

            const cliente = Cliente.editar({ nome, cpf });
            const endereco = Endereco.editar({
                cep,
                logradouro: resp.logradouro,
                bairro: resp.bairro,
                numero: numCasa,
                complemento: resp.complemento,
                cidade: resp.localidade,
                uf: resp.uf
            });
            const telefone = Telefone.editar({ numTelefone });
            const result = await clienteRepository.editar(id,  cliente, endereco, telefone);
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
            const result = await clienteRepository.deletar(id);
            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();
            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    }
}

export default clienteController;

async function viaCep(cep) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
            throw new Error('CEP não encontrado');

        }
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar CEP", error.message);

    }
}