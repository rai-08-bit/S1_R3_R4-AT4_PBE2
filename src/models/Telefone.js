export class Telefone {
    #id;
    #idCliente;
    #numero;
    #dataCad;

    constructor(pNumero, pIdCliente, pId = null) {
        this.numero = pNumero;
        this.idCliente = pIdCliente; 
        this.id = pId; // O ID deve ser deixado ao final, pois como seu campo é nulo, o primeiro parametro passado será o próximo depois do ID. Uma vez que se tem um parametro nulo, ele pode "confundir" a tipagem dos outros objetos.
    }

    get numero(){
        return this.#numero;
    }
    set numero(value) {
        console.log(value);
        
        this.#validarNumero(value);
        this.#numero = value;
    }

    get idCliente(){
        return this.#idCliente;
    }
    set idCliente(value) {
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    get id(){
        return this.#id;
    }
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    #validarNumero(value) {
        console.log(value);
        
        if (!value && (value.trim().length < 9 || value.trim().length > 11)) {
            throw new Error('O campo "Numero" deve conter números positivos')
        }
    }
    #validarIdCliente(value) {
        if (value && (value === null || isNaN(value) || value <= 0)) {
            throw new Error('O valor do ID do Cliente não corresponde o necessário');
        }
    }
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('O valor do ID não corresponde o necessário');

        }
    }

    // Design Pattern: Factory

    static criar(dados, idCliente = null) {
        if (dados.numero == null) {
            throw new Error('Números obrigatórios');
        }
        return new Telefone(dados.numero, null);
    }
    static editar(dados, id) {
        console.log(dados.numTelefone);
        
        return new Telefone(dados.numTelefone, dados.idCliente, id);
    }
}
