export class ItensPedido {
    #id
    #pedidoId
    #produtoId
    #quantidade
    #valorItem

    // Constructor
    constructor(pPedidoId, pProdutoId, pQuantidade, pValorItem, pId) {
        this.#pedidoId = pPedidoId;
        this.#produtoId = pProdutoId;
        this.#quantidade = pQuantidade;
        this.#valorItem = pValorItem;
        this.#id = pId;
    }

    // Getters
    get id() {
        return this.#id;
    }
    get PedidoId() {
        return this.#pedidoId;
    }
    get produtoId() {
        return this.#produtoId;
    }
    get quantidade() {
        return this.#quantidade;
    }
    get valorItem() {
        return this.#valorItem;
    }

    // Setters
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }
    set pedidoId(value) {
        this.#validarPedidoId(value);
        this.#pedidoId = value;
    }
    set produtoId(value) {
        this.#validarProdutoId(value);
        this.#produtoId = value;
    }
    set quantidade(value) {
        this.#validarQuantidade(value);
        this.#quantidade = value;
    }
    set valorItem(value) {
        this.#validarValorItem(value);
        this.#valorItem = value;
    }

    // Métodos auxiliares
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error("Verifique o ID informado");
        }
    }
    #validarPedidoId(value) {
        if (!value && value <= 0) {
            throw new Error("Verifique o ID do pedido");

        }
    }
    #validarProdutoId(value) {
        if (!value || value <= 0) {
            throw new Error("Verifique o ID do produto");

        }
    }
    #validarQuantidade(value) {
        if (!value || value <= 0) {
            throw new Error("Informe a quantidade de itens");
        }
    }
    #validarValorItem(value) {
        if (!value || value <= 0) {
            throw new Error("Informe um valor para o Item");
        }
    }

    static calcularSubTotal(itens) {
        return(itens.reduce(
            (total, item) => total + (item.valorItem * item.quantidade), 0
        ))
    }


    // Design Patterns
    static criar(dados) {
        return new ItensPedido(dados.pedidoId, dados.produtoId, dados.quantidade, dados.valorItem, null);
    }
    static editar(dados, id) {
        return new ItensPedido(dados.pedidoId, dados.produtoId, dados.quantidade, dados.valorItem, id);
    }

}