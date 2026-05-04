import { connection } from '../configs/Database.js';

const pedidoRepository = {
    criar: async (pedido, itemPed) => {

        const conn = await connection.getConnection();
        try {
            conn.beginTransaction();

            const sqlPedido = 'INSERT INTO pedidos(ClienteId, subTotal, status) VALUES (?,?,?);';
            const valuesPedido = [pedido.clienteId, pedido.subTotal, pedido.status];
            const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

            // INSERT item_pedidos
            itemPed.forEach(async element => {
                const sqlItemPed = 'INSERT INTO itens_pedidos(PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?,?,?,?);';
                const valuesItemPed = [rowsPedido.insertId, element.produtoId, element.quantidade, element.valorItem];
                await conn.execute(sqlItemPed, valuesItemPed);
            });


            conn.commit();
            return { rowsPedido };

        } catch (error) {

            conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release()
        }
    },
    criarItemPed: async (idPed, itemPed) => {

        const conn = await connection.getConnection();
        try {
            conn.beginTransaction();

            const sqlPedido = 'SELECT Id FROM pedidos WHERE Id=?;';
            const valuesPedido = [idPed];
            const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

            if (rowsPedido.length === 0) {
                throw new Error("O Id deste pedido não foi encontrado.");
            }

            const sqlProduto = 'SELECT Valor FROM produtos WHERE Id_Produto=?;';
            const valuesProduto = [itemPed.produtoId];
            const [rowsProduto] = await conn.execute(sqlProduto, valuesProduto);

            const valorProduto = rowsProduto[0].Valor;

            const sqlItemPed = 'INSERT INTO itens_pedidos(PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?,?,?,?);';
            const valuesItemPed = [idPed, itemPed.produtoId, itemPed.quantidade, valorProduto];
            await conn.execute(sqlItemPed, valuesItemPed);

            const sqlSubTotal = 'SELECT SUM(Quantidade * ValorItem) AS NewSubTotal FROM itens_pedidos WHERE PedidoId=?;';
            const valuesSubTotal = [idPed];
            const [rowsSubTotal] = await conn.execute(sqlSubTotal, valuesSubTotal);

            const novoSubTotal = rowsSubTotal[0].NewSubTotal ?? 0;

            const sqlNovoSubTotal = 'UPDATE pedidos SET SubTotal=? WHERE Id=?';
            const valuesNovoSubTotal = [novoSubTotal, idPed];
            const [rowsNovoSubTotal] = await conn.execute(sqlNovoSubTotal, valuesNovoSubTotal);


            conn.commit();
            return { rowsPedido, rowsProduto, rowsSubTotal, rowsNovoSubTotal };

        } catch (error) {

            conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release()
        }
    },
    editarItemPed: async (idPed, itemPed) => {
        const conn = await connection.getConnection();
        try {
            conn.beginTransaction();

            const sqlPedido = 'SELECT Id FROM pedidos WHERE Id=?;';
            const valuesPedido = [idPed];
            const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

            if (rowsPedido.length === 0) {
                throw new Error("O Id deste pedido não foi encontrado.");
            }

            const sqlItemPed = 'SELECT Id FROM itens_pedidos Id=? AND PedidoId=?';
            const valuesItemPed = [itemPed.PedidoId, idPed];
            const [rowsItemPed] = await conn.execute(sqlItemPed, valuesItemPed);

            if (rowsItemPed.length === 0) {
                throw new Error("O Item deste pedido não foi encontrado.");
            }

            const sqlPutItemPed = 'UPDATE itens_pedidos SET Quantidade=? WHERE Id=? AND PedidoId=?';
            const valuesPutItemPed = [itemPed.quantidade, itemPed.PedidoId, idPed];
            const rowsPutItemPed = await conn.execute(sqlPutItemPed, valuesPutItemPed);

            const sqlSubTotal = 'SELECT SUM(Quantidade * ValorItem) AS NewSubTotal FROM itens_pedidos WHERE PedidoId=?;';
            const valuesSubTotal = [idPed];
            const [rowsSubTotal] = await conn.execute(sqlSubTotal, valuesSubTotal);

            const novoSubTotal = rowsSubTotal[0].NewSubTotal ?? 0;

            const sqlNovoSubTotal = 'UPDATE pedidos SET SubTotal=? WHERE Id=?';
            const valuesNovoSubTotal = [novoSubTotal, idPed];
            const [rowsNovoSubTotal] = await conn.execute(sqlNovoSubTotal, valuesNovoSubTotal);


            conn.commit();
            return { rowsSubTotal, rowsItemPed, rowsNovoSubTotal, rowsPedido, rowsPutItemPed };

        } catch (error) {

            conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release()
        }
    },
    editarStatus: async (status, id) => {
        const conn = await connection.getConnection();
        try {
            conn.beginTransaction();

            const sqlPedido = 'UPDATE pedidos SET Status=? WHERE Id=?;';
            const valuesPedido = [status, id];
            const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

            conn.commit();
            return { rowsPedido };

        } catch (error) {

            conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release()
        }
    },
    selecionar: async () => {
        const conn = await connection.getConnection();
        try {
            conn.beginTransaction();

            const sqlPedido = 'SELECT * FROM pedidos;';
            const [rowsPedido] = await conn.execute(sqlPedido);

            const sqlItemPed = 'SELECT * FROM itens_pedidos;';
            const [rowsItemPed] = await conn.execute(sqlItemPed);

            conn.commit();
            return { rowsPedido, rowsItemPed };

        } catch (error) {

            conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release()
        }
    },
    selecionarPorId: async (id) => {
        const conn = await connection.getConnection();
        try {
            conn.beginTransaction();

            const sqlPedido = 'SELECT * FROM pedidos WHERE Id=?;';
            const valuesPedido = [id];
            const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);


            conn.commit();
            return { rowsPedido };

        } catch (error) {

            conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release()
        }
    },
    deletarItemPed: async (id) => {

        const conn = await connection.getConnection();
        try {
            conn.beginTransaction();

            const sqlItemPed = 'SELECT PedidoId FROM itens_pedidos WHERE Id=?;';
            const valuesItemPed = [id];
            const [rowsItemPed] = await conn.execute(sqlItemPed, valuesItemPed);

            const idPed = rowsItemPed[0].PedidoId;
            
            const sqlDelItemPed = 'DELETE FROM itens_pedidos WHERE Id=?;';
            const valuesDelItemPed = [id];
            const [rowsDelItemPed] = await conn.execute(sqlDelItemPed, valuesDelItemPed);

            const sqlSubTotal = 'SELECT IFNULL(SUM(Quantidade * ValorItem),0) AS NewSubTotal FROM itens_pedidos WHERE PedidoId=?;';
            const valuesSubTotal = [idPed];
            const [rowsSubTotal] = await conn.execute(sqlSubTotal, valuesSubTotal);

            const novoSubTotal = rowsSubTotal[0].NewSubTotal ?? 0;

            const sqlNovoSubTotal = 'UPDATE pedidos SET SubTotal=? WHERE Id=?';
            const valuesNovoSubTotal = [novoSubTotal, idPed];
            const [rowsNovoSubTotal] = await conn.execute(sqlNovoSubTotal, valuesNovoSubTotal);

            conn.commit();
            return { rowsItemPed, rowsDelItemPed, rowsNovoSubTotal, rowsSubTotal };

        } catch (error) {

            conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release()
        }

    },
}

export default pedidoRepository;