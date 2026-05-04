export class Endereco {
    #id;
    #idCliente;
    #logradouro;
    #bairro;
    #numero;
    #cidade;
    #uf;
    #cep;
    #complemento;
    #dataCad;

    constructor(pLogradouro, pBairro, pNumero, pCidade, pUf, pCep, pComplemento, pIdCliente, pId) {
        this.logradouro = pLogradouro;
        this.bairro = pBairro;
        this.numero = pNumero;
        this.cidade = pCidade;
        this.uf = pUf;
        this.cep = pCep;
        this.complemento = pComplemento;
        this.idCliente = pIdCliente;
        this.id = pId;
    }

    get numero(){
        return this.#numero;
    }
    set numero(value) {
        this.#validarNumero(value);
        this.#numero = value;
    }

    get cep(){
        return this.#cep;
    }
    set cep(value) {
        this.#cep = value;
    }
    
    get complemento(){
        return this.#complemento;
    }
    set complemento(value) {
        this.#complemento = value;
    }
    get idCliente(){
        return this.#idCliente;
    }
    set idCliente(value) {
        this.#idCliente = value;
    }

    #validarNumero(value) {
        if (value && value <= 0) {
            throw new Error('O valor do ID não corresponde o necessário');

        }
    }

    static criar(dados) {
        console.log('aqui ', dados.logradouro, dados.bairro,  dados.numero, dados.cidade, dados.uf, dados.cep);
        
        if (!dados.logradouro || !dados.bairro || dados.numero == null || !dados.cidade || !dados.uf|| !dados.cep) {
            throw new Error('Números obrigatórios');
        }
        return new Endereco(dados.logradouro, dados.bairro,  dados.numero, dados.cidade, dados.uf, dados.cep, dados.complemento, null, null);
    }
    static editar(dados, id) {
        return new Endereco(dados.logradouro, dados.bairro,  dados.numero, dados.cidade, dados.uf, dados.cep, dados.idCliente, id);
    }
}
