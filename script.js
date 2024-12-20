document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
        // Rosas do Deserto Section
        {
            name: 'Rosa do Deserto Triple Wish',
            description: 'Magnífica Rosa do Deserto com pétalas triplas em tons suaves',
            price: 'R$ 180,00',
            image: 'images/rosa-6542.jpg',
            category: 'Rosas do Deserto',
            arModels: [
                {
                    usdz: 'models/Triple_Wish_5metersperunit.usdz',
                    glb: 'models/Triple_Wish_5metersperunit.glb', 
                    label: 'Visualizar em AR'
                }
            ]
        },
        {
            name: 'Rosa do Deserto Rosa 2',
            description: 'Linda Rosa do Deserto com características únicas',
            price: 'R$ 150,00',
            image: 'images/rosa-6543.jpg',
            category: 'Rosas do Deserto',
            arModels: [
                {
                    usdz: 'models/Rosa_2.usdz',
                    glb: 'models/Rosa_2.glb', 
                    label: 'Visualizar em AR'
                }
            ]
        },
        // Móveis Section
        {
            name: 'Refrigerador Moderno',
            description: 'Refrigerador espaçoso com design contemporâneo',
            price: 'R$ 3.999,00',
            image: 'images/rosa-6544.jpg',
            category: 'Móveis',
            arModels: [
                {
                    usdz: 'models/11645_Refrigerator_v1_L3.usdz',
                    glb: 'models/11645_Refrigerator_v1_L3.glb', 
                    label: 'Ver em AR'
                }
            ]
        },
        {
            name: 'Cama King Size California',
            description: 'Cama King Size California com lençóis de tomilho',
            price: 'R$ 4.500,00',
            image: 'images/rosa-6545.jpg',
            category: 'Móveis',
            arModels: [
                {
                    usdz: 'models/California_King_Size_Bed_With_Thyme_Sheets_Pine_V1_NEW.usdz',
                    glb: 'models/California_King_Size_Bed_With_Thyme_Sheets_Pine_V1_NEW.glb', 
                    label: 'Visualizar em AR'
                }
            ]
        },
        {
            name: 'Cama Queen Size',
            description: 'Cama Queen Size com lençóis brancos e acabamento em preto',
            price: 'R$ 3.800,00',
            image: 'images/rosa-6546.jpg',
            category: 'Móveis',
            arModels: [
                {
                    usdz: 'models/Full_Size_Bed_with_White_Sheets_Black_V1.usdz',
                    glb: 'models/Full_Size_Bed_with_White_Sheets_Black_V1.glb', 
                    label: 'Ver em AR'
                }
            ]
        },
        {
            name: 'Mesa de Madeira',
            description: 'Mesa de madeira com design clássico',
            price: 'R$ 1.200,00',
            image: 'images/rosa-6548.jpg',
            category: 'Móveis',
            arModels: [
                {
                    usdz: 'models/Wood_Table.usdz',
                    glb: 'models/Wood_Table.glb', 
                    label: 'Visualizar em AR'
                }
            ]
        },
        // Acessórios Section
        {
            name: 'Torneira Moderna',
            description: 'Torneira com design moderno e acabamento premium',
            price: 'R$ 450,00',
            image: 'images/rosa-6549.jpg',
            category: 'Acessórios',
            arModels: [
                {
                    usdz: 'models/WaterTap-Modern.usdz',
                    glb: 'models/WaterTap-Modern.glb', 
                    label: 'Ver em AR'
                }
            ]
        }
    ];

    // Create category sections
    const categories = [...new Set(products.map(product => product.category))];
    const productGrid = document.querySelector('.product-grid');
    
    categories.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category;
        categorySection.appendChild(categoryTitle);
        
        const categoryGrid = document.createElement('div');
        categoryGrid.className = 'category-grid';
        
        const categoryProducts = products.filter(product => product.category === category);
        categoryProducts.forEach(product => {
            const productCard = createProductCard(product);
            categoryGrid.appendChild(productCard);
        });
        
        categorySection.appendChild(categoryGrid);
        productGrid.appendChild(categorySection);
    });

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Check if it's iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        // Create AR content based on device/browser
        let arContent = '';
        if (product.arModels) {
            if (isIOS) {
                // iOS devices: Use USDZ with AR Quick Look
                arContent = product.arModels.map(model => `
                    <a rel="ar" 
                       href="${model.usdz}#custom=allowsContentScaling=1&applePayButtonType=plain&checkoutTitle=${encodeURIComponent(product.name)}&checkoutSubtitle=Visualize%20em%20AR"
                       class="ar-link">
                       <img src="images/ar-badge.png" alt="${model.label}" class="ar-badge">
                       <span class="ar-label">${model.label}</span>
                    </a>
                `).join('');
            } else {
                // Other devices: Use Model-Viewer with GLB
                arContent = product.arModels.map(model => `
                    <model-viewer
                        src="${model.glb}"
                        ios-src="${model.usdz}"
                        ar
                        ar-modes="webxr scene-viewer quick-look"
                        camera-controls
                        shadow-intensity="1"
                        auto-rotate
                        camera-orbit="45deg 55deg 2.5m"
                        class="ar-viewer">
                        <button slot="ar-button" class="ar-button">
                            ${model.label}
                        </button>
                    </model-viewer>
                `).join('');
            }
        }

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
            <div class="ar-container">
                ${arContent}
            </div>
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
