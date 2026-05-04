import { connection } from '../configs/Database.js';

const produtoRepository = {
    criar: async (produto) => {
        const sql = 'INSERT INTO produtos (Nome, Id_Categoria, Valor, CaminhoImagem) VALUES (?,?,?,?);';
        const values = [produto.nome, produto.idCat, produto.valor, produto.caminho];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },
    editar: async (produto) => {
        const sql = 'UPDATE produtos SET Nome=?, Id_Categoria=?, Valor=?, CaminhoImagem=? WHERE Id_Produto=?;';
        const values = [produto.nome, produto.idCat, produto.valor, produto.caminho, produto.id];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },
    selecionar: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await connection.execute(sql);
        return rows;
    },
    deletar: async (id) => {
        const sql = 'DELETE FROM produtos WHERE Id_Produto=?;';
        const values = [id];
        const [rows] = await connection.execute(sql, values);
        return rows;
    }
}

export default produtoRepository;