// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona os elementos do HTML que serão atualizados dinamicamente
    const cestaContainer = document.getElementById('cesta-itens');// Container onde os itens da cesta serão exibidos
    const quantidadeTotalEl = document.getElementById('quantidade-total'); // Elemento que mostra a quantidade total de itens
    const subtotalEl = document.getElementById('subtotal');// Elemento que mostra o subtotal
    const totalGeralEl = document.getElementById('total-geral');// Elemento que mostra o total geral

    // Função para obter os itens da cesta armazenados
    function getCarrinho() {
        const cestaJson = localStorage.getItem('cesta'); // Recupera os dados salvos
        return cestaJson ? JSON.parse(cestaJson) : [];   // Converte para objeto/array ou retorna vazio se não existir
    }

    // Função para salvar a cesta atualizada
    function saveCarrinho(cesta) {
        localStorage.setItem('cesta', JSON.stringify(cesta)); // Converte para JSON e salva
    }

    // Função responsável por renderizar (mostrar) os itens da cesta na tela
    function renderizarCarrinho() {
        if (!cestaContainer) return; // Se não existir o container, encerra a função

        const cesta = getCarrinho(); // Obtém os itens da cesta
        cestaContainer.innerHTML = ''; // Limpa o conteúdo atual do container

        // Caso a cesta esteja vazia, mostra uma mensagem amigável
        if (cesta.length === 0) {
            cestaContainer.innerHTML = `<p style="text-align:center; padding:20px;">
                Sua cesta está vazia. Volte para a <a href="../index.html#produtos">página de gatinhos!</a>!
            </p>`;
            if (quantidadeTotalEl) quantidadeTotalEl.textContent = '0';
            if (subtotalEl) subtotalEl.textContent = 'R$ 0,00';
            if (totalGeralEl) totalGeralEl.textContent = 'R$ 0,00';
            return; // Sai da função
        }

        // Variáveis para calcular totais
        let totalQtd = 0;
        let totalPreco = 0;

        // Percorre cada item da cesta
        cesta.forEach(item => {
            totalQtd += item.quantidade;                // Soma a quantidade total
            totalPreco += item.preco * item.quantidade; // Soma o preço total

            // Cria um card para cada produto
            const card = document.createElement('div');
            card.classList.add('produtos-card');
            card.innerHTML = `
                <img src="${item.foto}" alt="${item.nome}" class="produtos-foto">
                <div class="produtos-info">
                    <h3 class="produtos-name">${item.nome}</h3>
                    <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                    <p>Quantidade: ${item.quantidade}</p>
                    <button class="btn-remover" data-id="${item.id}">Remover</button>
                </div>
            `;
            cestaContainer.appendChild(card); // Adiciona o card ao container
        });

        // Atualiza os elementos de totais na tela
        if (quantidadeTotalEl) quantidadeTotalEl.textContent = totalQtd;
        if (subtotalEl) subtotalEl.textContent = `R$ ${totalPreco.toFixed(2)}`;
        if (totalGeralEl) totalGeralEl.textContent = `R$ ${totalPreco.toFixed(2)}`;

        // Adiciona evento de clique nos botões "Remover"
        document.querySelectorAll('.btn-remover').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = btn.getAttribute('data-id'); // Pega o ID do produto
                removerDoCarrinho(id);                  // Chama a função para remover
            });
        });
    }

    // Função para remover um item da cesta
    function removerDoCarrinho(id) {
        let cesta = getCarrinho(); // Obtém a cesta atual

        // Procura o produto pelo ID
        const produto = cesta.find(item => item.id === id);

        if (produto) {
            if (produto.quantidade > 1) {
                // Se tiver mais de 1 unidade, reduz apenas 1
                produto.quantidade -= 1;
            } else {
                // Se tiver apenas 1 unidade, remove o produto da cesta
                cesta = cesta.filter(item => item.id !== id);
            }
        }

        // Salva a cesta atualizada e renderiza novamente
        saveCarrinho(cesta);
        renderizarCarrinho();
    }

    // Renderiza a cesta ao carregar a página
    renderizarCarrinho();
});
