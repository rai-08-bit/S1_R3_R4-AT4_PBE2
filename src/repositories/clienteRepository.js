import { connection } from '../configs/Database.js';

const clienteRepository = {
    criar: async (cliente, telefone, endereco) => {

        const conn = await connection.getConnection();
        try {
            conn.beginTransaction();

            const sqlCliente = 'INSERT INTO clientes(Nome, Cpf) VALUES (?,?);';
            const valuesCliente = [cliente.nome, cliente.cpf];
            const [rowsCliente] = await conn.execute(sqlCliente, valuesCliente);
            
            const sqlTel = 'INSERT INTO telefones(ClienteId, Numero) VALUES (?,?);';
            const valuesTel = [rowsCliente.insertId, telefone.numero];
            const [rowsTel] = await conn.execute(sqlTel, valuesTel);

            
            const sqlEndereco = 'INSERT INTO enderecos(ClienteId, Logradouro, Bairro, Numero, Complemento, Cidade, Uf, Cep) VALUES (?,?,?,?,?,?,?,?);';
            const valuesEndereco = [rowsCliente.insertId, endereco.logradouro, endereco.bairro, endereco.numero, endereco.complemento, endereco.cidade, endereco.uf, endereco.cep];
            const [rowsEndereco] = await conn.execute(sqlEndereco, valuesEndereco);

            conn.commit();
            return { rowsCliente, rowsTel, rowsEndereco };

        } catch (error) {

            conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release()
        }
    },
    editar: async (id, cliente, endereco, telefone) => {
        const conn = await connection.getConnection();
        try {
            conn.beginTransaction();

            
            const sqlCliente = 'UPDATE clientes SET Nome=?, Cpf=? WHERE Id=?';
            const valuesCliente = [cliente.nome, cliente.cpf, id];
            const [rowsCliente] = await conn.execute(sqlCliente, valuesCliente);

            const sqlTel = 'UPDATE telefones SET Numero=? WHERE Id=?';
            const valuesTel = [telefone.numero, id];
            const [rowsTel] = await conn.execute(sqlTel, valuesTel);

            
            const sqlEndereco = 'UPDATE enderecos SET Logradouro=?, Bairro=?, Numero=?, Complemento=?, Cidade=?, Uf=?, Cep=? WHERE Id=?';
            const valuesEndereco = [ endereco.logradouro, endereco.bairro, endereco.numero, endereco.complemento, endereco.cidade, endereco.uf, endereco.cep, id];
            const [rowsEndereco] = await conn.execute(sqlEndereco, valuesEndereco);

            conn.commit();
            return { rowsCliente, rowsTel, rowsEndereco };

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

            const sqlCliente = 'SELECT * FROM clientes;';
            const [rowsCliente] = await conn.execute(sqlCliente);

            const sqlTel = 'SELECT * FROM telefones;';
            const [rowsTel] = await conn.execute(sqlTel);

            const sqlEndereco = 'SELECT * FROM enderecos;';
            const [rowsEndereco] = await conn.execute(sqlEndereco);

            conn.commit();
            return { rowsCliente, rowsTel, rowsEndereco };

        } catch (error) {

            conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release()
        }
    },
    deletar: async (id) => {

        const conn = await connection.getConnection();
        try {
            conn.beginTransaction();

            const sqlTel = 'DELETE FROM telefones WHERE ClienteId=?;';
            const valuesTel = [id];
            const [rowsTel] = await conn.execute(sqlTel, valuesTel);
            
            
            const sqlEndereco = 'DELETE FROM enderecos WHERE ClienteId=?;';
            const valuesEndereco = [id];
            const [rowsEndereco] = await conn.execute(sqlEndereco, valuesEndereco);

            const sqlCliente = 'DELETE FROM clientes WHERE Id=?;';
            const valuesCliente = [id];
            const [rowsCliente] = await conn.execute(sqlCliente, valuesCliente);

            conn.commit();
            return { rowsCliente, rowsTel, rowsEndereco };

        } catch (error) {

            conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release()
        }
        
    }
}

export default clienteRepository;