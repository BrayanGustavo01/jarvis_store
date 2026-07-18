document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    //   1. BANCO DE DADOS DOS PRODUTOS (Caminhos corrigidos com ./)
    // =========================================
    const productsDatabase = {
        "1": {
            name: "Organizador de Cabos",
            price: 19.90,
            category: "Utilidades",
            image: "./assets/images/produto16.png",
            fallbackImage: "https://images.unsplash.com/photo-1551645121-d1034da75057?auto=format&fit=crop&w=600&q=80",
            rating: 5,
            description: "Elimine o emaranhado de fios no seu ambiente com nosso Organizador de Cabos premium. Projetado com canaletas inteligentes flexíveis e fixação de alta durabilidade, ele mantém cabos de carregadores, monitores e periféricos alinhados milimetricamente no seu setup.",
            colors: [
                { name: "Preto", hex: "#1a1a1a" },
                { name: "Cinza", hex: "#555555" }
            ]
        },
        "2": {
            name: "Dock para Headset + Controle",
            price: 79.90,
            category: "Gamer",
            image: "./assets/images/produto15.png",
            fallbackImage: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=600&q=80",
            rating: 5,
            description: "A solução definitiva 'tudo-em-um' para o seu console ou PC. Este dock ergonômico acomoda perfeitamente seu headset gamer preferido na parte superior e, na base, conta com um encaixe esculpido de alta estabilidade para controles de Xbox, PlayStation ou Nintendo Switch Pro.",
            colors: [
                { name: "Preto", hex: "#1a1a1a" },
                { name: "Branco", hex: "#f5f5f5", border: true },
                { name: "Vermelho", hex: "#ff3b30" }
            ]
        },
        "3": {
            name: "Suporte para Notebook",
            price: 49.90,
            category: "Utilidades",
            image: "./assets/images/produto14.png",
            fallbackImage: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80",
            rating: 5,
            description: "Ergonomia e refrigeração impecáveis. Este suporte eleva a tela do seu notebook ao nível ideal dos olhos, ajudando a evitar dores no pescoço. O vão inferior maximiza o fluxo de ar, permitindo que seu laptop trabalhe mais frio e silencioso durante tarefas intensas.",
            colors: [
                { name: "Preto", hex: "#1a1a1a" },
                { name: "Cinza", hex: "#555555" }
            ]
        },
        "4": {
            name: "Nome em LED Personalizado",
            price: 99.90,
            category: "Gamer",
            image: "./assets/images/produto13.png",
            fallbackImage: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
            rating: 5,
            description: "Torne o seu setup ou space de streaming exclusivo. Produzimos o seu nome ou tag com fonte estilizada moderna em 3D, integrada com fita de LED RGB inteligente de altíssimo brilho. Perfeito para preencher o fundo dos seus vídeos com personalidade.",
            colors: [
                { name: "RGB", hex: "linear-gradient(45deg, red, orange, yellow, green, blue, purple)", isGradient: true }
            ]
        },
        "5": {
            name: "Vaso Autoirrigável",
            price: 39.90,
            category: "Decoração",
            image: "./assets/images/produto12.png",
            fallbackImage: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80",
            rating: 4,
            description: "Design geométrico aliado à facilidade prática. Este vaso conta com um sistema de autoirrigação inteligente por pavio que fornece água na medida certa para suas plantas, permitindo que fiquem hidratadas sem esforço. Ideal para decoração moderna de mesas.",
            colors: [
                { name: "Branco", hex: "#f5f5f5", border: true },
                { name: "Mármore", hex: "linear-gradient(135deg, #e0e0e0, #bebebe)", isGradient: true },
                { name: "Preto", hex: "#1a1a1a" }
            ]
        },
        "6": {
            name: "Valet Tray Organizador",
            price: 54.90,
            category: "Utilidades",
            image: "./assets/images/produto7.png",
            fallbackImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
            rating: 5,
            description: "A bandeja de entrada definitiva para sua casa ou escritório. Com compartimentos desenhados especificamente para smartphone, carteira, chaves de casa e moedas. Mantenha seus bolsos vazios e seu balcão incrivelmente limpo.",
            colors: [
                { name: "Preto", hex: "#1a1a1a" },
                { name: "Marrom Café", hex: "#5c4033" }
            ]
        },
        "7": {
            name: "Suporte Premium para Tablet",
            price: 34.90,
            category: "Utilidades",
            image: "./assets/images/produto8.png",
            fallbackImage: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80",
            rating: 5,
            description: "Estabilidade impecável para assistir a tutoriais, receitas ou para usar o tablet como segunda tela de produtividade no computador. Possui angulação ergonômica ajustada e calha especial para não pressionar a tela ou bloquear legendas.",
            colors: [
                { name: "Preto", hex: "#1a1a1a" },
                { name: "Cinza", hex: "#555555" }
            ]
        },
        "8": {
            name: "Organizador Modular",
            price: 69.90,
            category: "Utilidades",
            image: "./assets/images/produto9.png",
            fallbackImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
            rating: 5,
            description: "Crie o seu próprio layout! Este organizador possui peças de encaixe geométrico para você reconfigurar as divisórias de canetas, cartões, SD cards e pen drives conforme o seu espaço de trabalho exigir.",
            colors: [
                { name: "Preto/Laranja", hex: "linear-gradient(135deg, #1a1a1a 50%, #ff6600 50%)", isGradient: true },
                { name: "Branco/Cinza", hex: "linear-gradient(135deg, #f5f5f5 50%, #555555 50%)", isGradient: true }
            ]
        },
        "9": {
            name: "Chaveiros Customizados",
            price: 14.90,
            category: "Decoração",
            image: "./assets/images/produto10.png",
            fallbackImage: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80",
            rating: 5,
            description: "Chaveiros com design de alta qualidade, logos personalizados ou iniciais de nomes. Produzido com filamentos de alto brilho para garantir excelente durabilidade mecânica no seu chaveiro do dia a dia.",
            colors: [
                { name: "Dourado", hex: "#ffd700" },
                { name: "Prata", hex: "#c0c0c0" },
                { name: "Preto", hex: "#1a1a1a" }
            ]
        },
        "10": {
            name: "Suporte Temático Alexa Robot",
            price: 49.90,
            category: "Decoração",
            image: "./assets/images/produto11.png",
            fallbackImage: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80",
            rating: 5,
            description: "Dê uma personalidade única ao seu assistente de voz! Este suporte em formato de robô futurista foi projetado sob medida para acomodar perfeitamente sua Alexa Echo Dot. Ele eleva o dispositivo, melhora a acústica ao não obstruir as saídas de som e transforma a sua Alexa em um simpático robozinho decorativo para o seu setup ou quarto.",
            colors: [
                { name: "Preto", hex: "#1a1a1a" },
                { name: "Branco", hex: "#f5f5f5", border: true },
                { name: "Cinza", hex: "#555555" }
            ]
        },
        "11": {
            name: "Luminária Cyberpunk LED Ciano",
            price: 119.90,
            category: "Gamer",
            image: "./assets/images/produto17.png",
            fallbackImage: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
            rating: 5,
            description: "Luminária de mesa futurista com design geométrico angular agressivo em formato de bumerangue. Acabamento texturizado premium imitando fibra de carbono preta com iluminação LED interna integrada em ciano neon puro, projetada sob medida para setups de alta performance.",
            colors: [
                { name: "Ciano Neon", hex: "#00f0ff" }
            ]
        },
        "12": {
            name: "Suporte Articulado Gamer Duplo",
            price: 89.90,
            category: "Gamer",
            image: "./assets/images/produto18.png",
            fallbackImage: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=600&q=80",
            rating: 5,
            description: "Suporte robusto articulado duplo de engenharia premium. Possui encaixe superior ideal para acoplar o smartphone como segunda tela e base inferior perfeitamente modelada para controles (Xbox, PlayStation ou similares). Otimização máxima de espaço com estética industrial agressiva.",
            colors: [
                { name: "Cinza/Laranja", hex: "linear-gradient(135deg, #555555 50%, #ff6600 50%)", isGradient: true },
                { name: "Total Preto", hex: "#1a1a1a" }
            ]
        }
    };

    // =========================================
    //   2. CARREGAMENTO DINÂMICO DOS DETALHES
    // =========================================
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = productsDatabase[productId];

    if (!product) {
        const detailContainer = document.querySelector('.product-detail-container');
        if (detailContainer) {
            detailContainer.innerHTML = `
                <div style="text-align: center; padding: 100px 20px; width: 100%; grid-column: span 2;">
                    <h2>Produto não encontrado</h2>
                    <p style="margin-bottom: 20px; color: #888;">O produto solicitado não consta em nosso catálogo ativo.</p>
                    <a href="./index.html" class="btn-primary" style="display: inline-block; text-decoration:none;">Voltar para a Loja</a>
                </div>
            `;
        }
        return;
    }

    const mainImg = document.getElementById('main-product-img');
    const categoryEl = document.getElementById('product-category');
    const titleEl = document.getElementById('product-title');
    const priceEl = document.getElementById('product-price');
    const ratingEl = document.getElementById('product-rating');
    const descEl = document.getElementById('product-description');
    const colorsContainer = document.getElementById('product-colors');

    if (mainImg) {
        mainImg.src = product.image;
        mainImg.alt = product.name;
        mainImg.onerror = function() {
            this.src = product.fallbackImage;
        };
    }

    if (categoryEl) categoryEl.textContent = `Home / ${product.category}`;
    if (titleEl) titleEl.textContent = product.name;
    if (priceEl) priceEl.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    if (descEl) descEl.textContent = product.description;

    let selectedColor = "";
    if (colorsContainer) {
        colorsContainer.innerHTML = '';
        product.colors.forEach((color, index) => {
            const btn = document.createElement('button');
            btn.className = 'color-dot';
            if (index === 0) {
                btn.classList.add('active');
                selectedColor = color.name;
            }
            btn.dataset.color = color.name;
            
            if (color.isGradient) {
                btn.style.background = color.hex;
            } else {
                btn.style.backgroundColor = color.hex;
            }

            if (color.border) {
                btn.style.border = '1px solid #ccc';
            }

            btn.title = color.name;
            colorsContainer.appendChild(btn);

            btn.addEventListener('click', () => {
                colorsContainer.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedColor = color.name;
            });
        });
    }

    if (ratingEl) {
        ratingEl.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            star.className = i <= product.rating ? 'fa-solid fa-star' : 'fa-regular fa-star';
            ratingEl.appendChild(star);
        }
        ratingEl.innerHTML += ` <span>(${product.rating}.0 de 5)</span>`;
    }

    window.currentProductData = {
        id: productId,
        name: product.name,
        price: product.price,
        getSelectedColor: () => selectedColor
    };
});
