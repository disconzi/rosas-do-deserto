document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
        {
            name: 'Rosa do Deserto Triple Wish',
            description: 'Magnífica Rosa do Deserto com pétalas triplas em tons suaves',
            price: 'R$ 180,00',
            image: 'images/rosa-6542.jpg',
            arModels: [
                {
                    file: 'models/Triple_Wish.usdz',
                    label: 'Versão Original'
                },
                {
                    file: 'models/Triple_Wish2.usdz',
                    label: 'Versão 2'
                },
                {
                    file: 'models/Triple_Wish_5metersperunit.usdz',
                    label: '5m por Unidade'
                },
                {
                    file: 'models/Triple_Wishmeter.usdz',
                    label: 'Versão Metro'
                }
            ]
        },
        {
            name: 'Rosa do Deserto Rosa Delicada',
            description: 'Linda Rosa do Deserto com tons rosados suaves',
            price: 'R$ 150,00',
            image: 'images/rosa-6543.jpg'
        },
        {
            name: 'Rosa do Deserto Amarela',
            description: 'Elegante Rosa do Deserto em tons amarelados',
            price: 'R$ 160,00',
            image: 'images/rosa-6544.jpg'
        },
        {
            name: 'Rosa do Deserto Dupla',
            description: 'Impressionante Rosa do Deserto com pétalas duplas',
            price: 'R$ 170,00',
            image: 'images/rosa-6545.jpg'
        }
    ];

    // Populate product grid
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Check if it's iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        // Create AR buttons if the product has AR models
        let arButtons = '';
        if (product.arModels && isIOS) {
            arButtons = `
                <div class="ar-buttons-grid">
                    ${product.arModels.map(model => `
                        <a rel="ar" 
                           href="${model.file}#custom=allowsContentScaling=1&applePayButtonType=plain&checkoutTitle=Rosa%20do%20Deserto&checkoutSubtitle=Visualize%20em%20AR"
                           data-ar-scale="fixed"
                           data-ar-fallback="no"
                           data-ar-modes="quicklook scene"
                           class="ar-link">
                           <img src="images/ar-badge.png" alt="${model.label}" class="ar-badge">
                           <span class="ar-label">${model.label}</span>
                        </a>
                    `).join('')}
                </div>`;
        }

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
            ${arButtons}
            ${product.arModels ? `
                <div class="external-ar-link">
                    <a href="ar-view.html" target="_blank">
                        Ver em AR (Link Externo) ↗
                    </a>
                </div>
            ` : ''}
        `;
        return card;
    }

    // Make showARView available globally for onclick handlers
    window.showARView = function(modelPath) {
        if (!/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            alert('Para uma melhor experiência AR, por favor use um dispositivo iOS.');
            return;
        }
    };

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add form submission logic here
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });

    // AR View button handling
    const arButton = document.getElementById('ar-view');
    arButton.addEventListener('click', function() {
        // Initialize AR experience
        // initializeAR();
    });

    // Header scroll behavior
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 10; // minimum amount of pixels to trigger hide/show

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (Math.abs(scrollTop - lastScrollTop) <= scrollThreshold) return;

        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            // Scrolling down
            header.classList.add('nav-up');
        } else {
            // Scrolling up
            header.classList.remove('nav-up');
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });

});
