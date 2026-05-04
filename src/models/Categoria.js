export class Categoria {
    #id;
    #nome;
    #descricao;
    #dataCad;

    constructor(pNome, pDescricao, pId) {
        this.nome = pNome;
        this.descricao = pDescricao;
        this.id = pId; // O ID deve ser deixado ao final, pois como seu campo é nulo, o primeiro parametro passado será o próximo depois do ID. Uma vez que se tem um parametro nulo, ele pode "confundir" a tipagem dos outros objetos.
    }

    get nome(){
        return this.#nome;
    }
    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get descricao(){
        return this.#descricao;
    }
    set descricao(value) {
        this.#validarDescricao(value);
        this.#descricao = value;
    }
    
    get id(){
        return this.#id;
    }
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo "Nome" é obrigatório e deve ter entre 3 e 45 caracteres');

        }
    }
    #validarDescricao(value) {
        if (value && value.trim().length < 5 || value.trim().length > 100) {
            throw new Error('O campo "Descrição" é obrigatório e deve ter entre 5 e 100 caracteres');
        }
    }
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('O valor do ID não corresponde o necessário');

        }
    }

    // Design Pattern: Factory

    static criar(dados) {
        return new Categoria(dados.nome, dados.descricao, null);
    }
    static editar(dados, id) {
        return new Categoria(dados.nome, dados.descricao, id);
    }
}
