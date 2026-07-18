document.addEventListener('DOMContentLoaded', () => {
    // === ESTADO GLOBAL ===
    let cart = JSON.parse(localStorage.getItem('jarvis_cart')) || [];
    let usuarioLogado = localStorage.getItem('jarvis_user') || null;

    // === ELEMENTOS DO DOM ===
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const loginModal = document.getElementById('login-modal');
    const openLoginBtn = document.getElementById('open-login-btn');
    const closeLoginBtn = document.getElementById('close-login-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalValue = document.getElementById('cart-total-value');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    const toast = document.getElementById('toast-notification');
    const categoryCards = document.querySelectorAll('.category-card');
    const productCards = document.querySelectorAll('.product-card');
    const loginForm = document.querySelector('.modal-form');

    // === VERIFICAÇÃO E ATUALIZAÇÃO DO LOGIN NA TELA ===
    function gerenciarEstadoLogin() {
        if (!openLoginBtn) return;

        if (usuarioLogado) {
            openLoginBtn.innerHTML = `<i class="fa-regular fa-user"></i> Olá, ${usuarioLogado} <span style="margin-left:8px; color: #ff3b30; font-size: 0.8rem;">(Sair)</span>`;
            openLoginBtn.style.borderColor = "var(--accent)";
        } else {
            openLoginBtn.innerHTML = `<i class="fa-regular fa-user"></i> Entrar`;
            openLoginBtn.style.borderColor = "";
        }
    }

    if (openLoginBtn) {
        openLoginBtn.addEventListener('click', () => {
            if (usuarioLogado) {
                if(confirm("Deseja realmente sair da sua conta?")) {
                    localStorage.removeItem('jarvis_user');
                    usuarioLogado = null;
                    gerenciarEstadoLogin();
                    showToast("Você saiu da sua conta.");
                }
            } else {
                openModal(loginModal);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nomeInput = document.getElementById('login-name');
            if (!nomeInput) return;

            const nomeDigitado = nomeInput.value.trim();
            const nomeFormatado = nomeDigitado.charAt(0).toUpperCase() + nomeDigitado.slice(1);

            localStorage.setItem('jarvis_user', nomeFormatado);
            usuarioLogado = nomeFormatado;

            gerenciarEstadoLogin();
            closeModal(loginModal);
            showToast(`Bem-vindo, ${nomeFormatado}!`);
            
            loginForm.reset();
        });
    }

    function verificarLoginParaCarrinho() {
        if (!usuarioLogado) {
            showToast("⚠️ Ops! Faça login ou crie uma conta para gerenciar seu carrinho.");
            openModal(loginModal);
            return false;
        }
        return true;
    }

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // === ATUALIZAÇÃO DO CARRINHO ===
    function updateCart() {
        localStorage.setItem('jarvis_cart', JSON.stringify(cart));
        
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        if (cartCount) cartCount.textContent = totalItems;

        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
            if (cartTotalValue) cartTotalValue.textContent = 'R$ 0,00';
            const cartNotesInput = document.getElementById('cart-notes');
            if (cartNotesInput) cartNotesInput.value = '';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-meta">Cor: ${item.color}</span>
                    <span class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}</span>
                </div>
                <div class="cart-item-actions">
                    <button class="btn-qty decrease" data-index="${index}">-</button>
                    <span class="qty-num">${item.quantity}</span>
                    <button class="btn-qty increase" data-index="${index}">+</button>
                    <button class="btn-remove" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });

        if (cartTotalValue) cartTotalValue.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            if (!verificarLoginParaCarrinho()) return;

            const button = e.target.closest('button');
            if (!button) return;

            const index = button.dataset.index;

            if (button.classList.contains('increase')) {
                cart[index].quantity += 1;
            } else if (button.classList.contains('decrease')) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
            } else if (button.classList.contains('btn-remove')) {
                cart.splice(index, 1);
            }
            updateCart();
        });
    }

    // === ADICIONAR AO CARRINHO (VITRINE PRINCIPAL) ===
    document.querySelectorAll('.btn-buy').forEach(button => {
        if (button.id === 'add-to-cart-btn') return;

        button.addEventListener('click', (e) => {
            if (!verificarLoginParaCarrinho()) return;

            const card = e.target.closest('.product-card');
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            
            const activeColorBtn = card ? card.querySelector('.color-dot.active') : null;
            const color = activeColorBtn ? activeColorBtn.dataset.color : 'Padrão';

            const existingItem = cart.find(item => item.id === id && item.color === color);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, color, quantity: 1 });
            }

            updateCart();
            showToast(`${name} (${color}) adicionado ao carrinho!`);
        });
    });

    // === ADICIONAR AO CARRINHO (PÁGINA DETALHES DE PRODUTO) ===
    const pdAddToCartBtn = document.getElementById('add-to-cart-btn');
    if (pdAddToCartBtn) {
        pdAddToCartBtn.addEventListener('click', () => {
            if (!verificarLoginParaCarrinho()) return;
            if (!window.currentProductData) return;

            const qtyInput = document.getElementById('product-qty');
            const quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
            const product = window.currentProductData;
            const color = product.getSelectedColor() || 'Padrão';

            const existingItem = cart.find(item => item.id === product.id && item.color === color);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    color: color,
                    quantity: quantity
                });
            }

            updateCart();
            showToast(`${product.name} (${color}) adicionado ao carrinho!`);
        });
    }

    // === SELEÇÃO DE CORES NOS CARDS ===
    document.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            const container = e.target.closest('.colors');
            if (container) {
                container.querySelectorAll('.color-dot').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    });

    // === FILTRO DE CATEGORIAS (SOLUÇÃO COMPLETA ANTI-ERRO) ===
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Garante que pegamos o card correto mesmo clicando no ícone ou texto interno
            const targetCard = e.target.closest('.category-card');
            if (!targetCard) return;

            categoryCards.forEach(c => c.classList.remove('active'));
            targetCard.classList.add('active');

            const filter = targetCard.dataset.filter ? targetCard.dataset.filter.toLowerCase() : 'all';

            productCards.forEach(product => {
                const productCategory = product.dataset.category ? product.dataset.category.toLowerCase() : '';
                
                if (filter === 'all' || productCategory === filter) {
                    product.style.setProperty('display', 'flex', 'important');
                } else {
                    product.style.setProperty('display', 'none', 'important');
                }
            });
        });
    });

    // === FINALIZAR VIA WHATSAPP COM OBSERVAÇÃO ===
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (!verificarLoginParaCarrinho()) return;
            if (cart.length === 0) return;

            const cartNotesInput = document.getElementById('cart-notes');
            const observacoes = cartNotesInput ? cartNotesInput.value.trim() : '';

            let message = `Olá, gostaria de finalizar meu pedido na Jarvis Store!\n`;
            message += `👤 *Cliente:* ${usuarioLogado}\n`;
            message += `----------------------------------\n\n`;
            
            let total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;
                message += `🔹 *${item.name}*\n   Cor: ${item.color}\n   Qtd: ${item.quantity}x - R$ ${item.price.toFixed(2).replace('.', ',')}\n\n`;
            });

            message += `----------------------------------\n`;
            message += `💰 *Total do Pedido: R$ ${total.toFixed(2).replace('.', ',')}*\n`;

            if (observacoes) {
                message += `\n📝 *Observações:* ${observacoes}\n`;
            }
            
            const whatsappNumber = '5511985143257'; 
            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    // === MODAIS ===
    const openModal = (modal) => modal && modal.classList.add('active');
    const closeModal = (modal) => modal && modal.classList.remove('active');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            if (verificarLoginParaCarrinho()) openModal(cartModal);
        });
    }
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => closeModal(cartModal));
    if (closeLoginBtn) closeLoginBtn.addEventListener('click', () => closeModal(loginModal));

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) closeModal(cartModal);
        if (e.target === loginModal) closeModal(loginModal);
    });

    gerenciarEstadoLogin();
    updateCart();
});
