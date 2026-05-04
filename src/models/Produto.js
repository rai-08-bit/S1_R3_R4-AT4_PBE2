export class Produto{
    #id;
    #idCat;
    #nome;
    #caminho;
    #valor
    #dataCad;
    
    constructor(pNome, pCaminho, pValor, pIdCat, pId) {    
         this.nome = pNome;
         this.valor = pValor;
         this.caminho = pCaminho;
         this.idCat = pIdCat;
         this.id = pId; // O ID deve ser deixado ao final, pois como seu campo é nulo, o primeiro parametro passado será o próximo depois do ID. Uma vez que se tem um parametro nulo, ele pode "confundir" a tipagem dos outros objetos.
     }

    get nome(){
        return this.#nome;
    }
    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }
    
    get valor() {
        return this.#valor
    }
    set valor(value) {
        this.#validarValor(value);
        this.#valor = value;
    }

    get caminho() {
       return this.#caminho;
    }
    set caminho(value) {
        this.#validarPathImagem(value);
        this.#caminho = value;
    }
    
    get id(){
        return this.#id;
    }
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get idCat(){
        return this.#idCat;
    }
    set idCat(value) {
        this.#validarIdCategoria(value);
        this.#idCat = value;
    }


    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo "Nome" é obrigatório e deve ter entre 3 e 45 caracteres');

        }
    }
    #validarValor(value) {
         
        if ( !value || isNaN(value) || value <= 0) {
            throw new Error('O campo valor deve conter números positivos')
 
        }
    }
    #validarPathImagem(value) {
        
        if (value && (value.trim().length < 10 || value.trim().length > 2550)) {
            throw new Error('O campo "Caminho Imagem" é obrigatório e deve ter entre 20 e 255 caracteres');
        }
    }
    #validarIdCategoria(value) {
        if (value === 0 || value === null || isNaN(value) || value <= 0) {
            throw new Error('O valor do ID categoria não corresponde o necessário');
        }
    }
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('O valor do ID não corresponde o necessário');
        }
    }

    // Design Pattern: Factory

    static criar(dados) {        
        return new Produto(dados.nome, dados.vinculoImagem, dados.valor, dados.idCategoria, null);
    }
    static editar(dados, id) {
        return new Produto(dados.nome, dados.vinculoImagem, dados.valor, dados.idCategoria, id);
    }
}