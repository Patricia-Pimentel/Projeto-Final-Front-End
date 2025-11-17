document.addEventListener('DOMContentLoaded', function () {
    // =========================================================
    // FUNÇÕES AUXILIARES
    // =========================================================

    function getCarrinho() {
        const cestaJson = localStorage.getItem('cesta');
        return cestaJson ? JSON.parse(cestaJson) : [];
    }

    function saveCarrinho(cesta) {
        localStorage.setItem('cesta', JSON.stringify(cesta));
        atualizarContador();
    }

    function atualizarContador() {
        const contador = document.getElementById('contador-cesta');
        const cesta = getCarrinho();
        const totalItens = cesta.reduce((acc, item) => acc + item.quantidade, 0);
        if (contador) contador.textContent = totalItens;
    }

    function adicionarAoCarrinho(novoProduto) {
        let cesta = getCarrinho();

        // Verifica se o produto já existe
        const produtoExistente = cesta.find(item => item.id === novoProduto.id);

        if (produtoExistente) {
            produtoExistente.quantidade += 1;
        } else {
            novoProduto.quantidade = 1;
            cesta.push(novoProduto);
        }

        saveCarrinho(cesta);

        alert(`"${novoProduto.nome}" adicionado(a) ao cesta!\nTotal de itens: ${cesta.reduce((acc, item) => acc + item.quantidade, 0)}`);
    }

    // Atualiza contador ao carregar a página
    atualizarContador();

    // =========================================================
    // FILTRO DE BUSCA
    // =========================================================
    const searchBox = document.getElementById('search-box');
    const cardContainer = document.querySelector('#produtos .cards-container');
    const produtoCards = cardContainer ? cardContainer.querySelectorAll('.produtos-card') : [];

    if (searchBox && cardContainer) {
        searchBox.addEventListener('input', function () {
            const termoBusca = searchBox.value.trim().toLowerCase();

            produtoCards.forEach(card => {
                const termosData = card.getAttribute('data-nome-produto');
                const termosBuscaCard = termosData ? termosData.toLowerCase() : '';

                card.style.display = (termoBusca === '' || termosBuscaCard.includes(termoBusca)) ? 'block' : 'none';
            });
        });

        const searchForm = searchBox.closest('form');
        if (searchForm) {
            searchForm.addEventListener('submit', function (e) {
                e.preventDefault();
            });
        }
    }


    // =========================================================
    // BOTÕES "ADICIONAR AO CARRINHO"
    // =========================================================
    document.querySelectorAll('.btn-adicionar-cesta').forEach(btn => {
        btn.addEventListener('click', function (event) {
            const card = event.target.closest('.produtos-card');

            if (card) {
                const produto = {
                    id: card.getAttribute('data-id'),
                    nome: card.getAttribute('data-nome'),
                    preco: parseFloat(card.getAttribute('data-preco')),
                    foto: card.getAttribute('data-foto')
                };
                adicionarAoCarrinho(produto);
            }
        });
    });


    // =========================================================
    // BOTÕES "ADICIONAR AO CARRINHO PAGINAS"
    // =========================================================
    document.querySelectorAll('.btn-adicionar-cesta-pag').forEach(btn => {
        btn.addEventListener('click', function (event) {
            const card = event.target.closest('.produtos-card-pages');

            if (card) {
                const produto = {
                    id: card.getAttribute('data-id'),
                    nome: card.getAttribute('data-nome'),
                    preco: parseFloat(card.getAttribute('data-preco')),
                    foto: card.getAttribute('data-foto')
                };
                adicionarAoCarrinho(produto);
            }
        });
    });
});
   // =========================================================
    // BOTÕES "FORMULARIO"
    // =========================================================

// Captura o formulário
    const form = document.getElementById('form-contato');

    // Adiciona evento de envio
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // impede envio imediato para mostrar o alerta
        alert('Formulário enviado com sucesso!');
        

    });

