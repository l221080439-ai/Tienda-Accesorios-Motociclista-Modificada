// ===== DATOS GLOBALES =====
let cartItems = [];
let currentUser = null;
let currentView = 'home';
let pendingCheckout = false;
let checkoutStep = 1;
let checkoutData = {};

// Productos del catálogo
const allProducts = [
    { id: 1, name: 'Casco Integral Racing Pro', price: 89990, originalPrice: 119990, image: 'https://images.unsplash.com/photo-1673526154034-1749d70dd472?w=400', category: 'Cascos', rating: 4.8, inStock: true },
    { id: 2, name: 'Chaqueta de Cuero Premium', price: 159990, originalPrice: 199990, image: 'https://images.unsplash.com/photo-1654720498638-46c8d93bc32d?w=400', category: 'Chaquetas', rating: 4.6, inStock: true },
    { id: 3, name: 'Botas Touring Resistentes', price: 79990, image: 'https://images.unsplash.com/photo-1758621516645-637a426889c5?w=400', category: 'Botas', rating: 4.5, inStock: true },
    { id: 4, name: 'Guantes Deportivos', price: 29990, originalPrice: 39990, image: 'https://images.unsplash.com/photo-1719535218083-bd6f9c860229?w=400', category: 'Accesorios', rating: 4.7, inStock: true },
    { id: 5, name: 'Casco Modular Adventure', price: 129990, image: 'https://images.unsplash.com/photo-1673526154034-1749d70dd472?w=400', category: 'Cascos', rating: 4.9, inStock: false },
    { id: 6, name: 'Chaqueta Textil Ventilada', price: 99990, image: 'https://images.unsplash.com/photo-1654720498638-46c8d93bc32d?w=400', category: 'Chaquetas', rating: 4.4, inStock: true },
    { id: 7, name: 'Casco Deportivo Carbon', price: 199990, originalPrice: 249990, image: 'https://images.unsplash.com/photo-1673526154034-1749d70dd472?w=400', category: 'Cascos', rating: 4.9, inStock: true },
    { id: 8, name: 'Casco Open Face Vintage', price: 69990, image: 'https://images.unsplash.com/photo-1673526154034-1749d70dd472?w=400', category: 'Cascos', rating: 4.5, inStock: true },
    { id: 9, name: 'Chaqueta Touring Impermeable', price: 179990, image: 'https://images.unsplash.com/photo-1654720498638-46c8d93bc32d?w=400', category: 'Chaquetas', rating: 4.7, inStock: true },
    { id: 10, name: 'Chaqueta Racing Aerodinámica', price: 249990, originalPrice: 299990, image: 'https://images.unsplash.com/photo-1654720498638-46c8d93bc32d?w=400', category: 'Chaquetas', rating: 4.8, inStock: true },
    { id: 11, name: 'Botas Racing Deportivas', price: 119990, originalPrice: 149990, image: 'https://images.unsplash.com/photo-1758621516645-637a426889c5?w=400', category: 'Botas', rating: 4.7, inStock: true },
    { id: 12, name: 'Botas Adventure Impermeables', price: 149990, image: 'https://images.unsplash.com/photo-1758621516645-637a426889c5?w=400', category: 'Botas', rating: 4.6, inStock: false },
    { id: 13, name: 'Protecciones Completas', price: 89990, image: 'https://images.unsplash.com/photo-1719535218083-bd6f9c860229?w=400', category: 'Accesorios', rating: 4.8, inStock: true },
    { id: 14, name: 'Intercomunicador Bluetooth', price: 59990, originalPrice: 79990, image: 'https://images.unsplash.com/photo-1719535218083-bd6f9c860229?w=400', category: 'Accesorios', rating: 4.5, inStock: true },
    { id: 15, name: 'Gafas de Protección', price: 19990, image: 'https://images.unsplash.com/photo-1719535218083-bd6f9c860229?w=400', category: 'Accesorios', rating: 4.3, inStock: true },
    { id: 16, name: 'Pantalones Touring Resistentes', price: 109990, image: 'https://images.unsplash.com/photo-1654720498638-46c8d93bc32d?w=400', category: 'Pantalones', rating: 4.6, inStock: true },
    { id: 17, name: 'Pantalones Cuero Racing', price: 179990, originalPrice: 219990, image: 'https://images.unsplash.com/photo-1654720498638-46c8d93bc32d?w=400', category: 'Pantalones', rating: 4.8, inStock: true },
    { id: 18, name: 'Pantalones Textil Ventilados', price: 79990, image: 'https://images.unsplash.com/photo-1654720498638-46c8d93bc32d?w=400', category: 'Pantalones', rating: 4.4, inStock: true }
];

const categories = [
    { id: 1, name: 'Cascos', image: 'https://images.unsplash.com/photo-1673526154034-1749d70dd472?w=400', description: 'Protección y estilo para tu cabeza' },
    { id: 2, name: 'Chaquetas', image: 'https://images.unsplash.com/photo-1654720498638-46c8d93bc32d?w=400', description: 'Chaquetas de cuero y textiles' },
    { id: 3, name: 'Botas', image: 'https://images.unsplash.com/photo-1758621516645-637a426889c5?w=400', description: 'Calzado resistente y cómodo' },
    { id: 4, name: 'Accesorios', image: 'https://images.unsplash.com/photo-1719535218083-bd6f9c860229?w=400', description: 'Guantes, protecciones y más' }
];

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadFromLocalStorage();
    renderCategories();
    renderFeaturedProducts();
    setupEventListeners();
    updateCartBadge();
    updateUserButton();
});

function initializeApp() {
    // Inicializar usuarios mock si no existen
    if (!localStorage.getItem('motogear_users')) {
        const initialUsers = [
            {
                id: '1',
                name: 'Carlos Rodríguez',
                email: 'carlos.rodriguez@email.com',
                phone: '+57 300 1234567',
                password: 'password123',
                registeredDate: '2024-01-15',
                totalOrders: 12,
                totalSpent: 1450000,
                status: 'Activo'
            },
            {
                id: '2',
                name: 'Ana María López',
                email: 'ana.lopez@email.com',
                phone: '+57 310 9876543',
                password: 'password123',
                registeredDate: '2024-02-20',
                totalOrders: 8,
                totalSpent: 980000,
                status: 'Activo'
            }
        ];
        localStorage.setItem('motogear_users', JSON.stringify(initialUsers));
    }

    // Inicializar órdenes mock si no existen
    if (!localStorage.getItem('motogear_orders')) {
        const initialOrders = [
            {
                id: 'ORD-2024-001',
                userId: '1',
                date: '2024-09-15',
                status: 'Entregado',
                total: 289980,
                items: [
                    { name: 'Casco Integral Racing Pro', quantity: 1, price: 89990 },
                    { name: 'Chaqueta de Cuero Premium', quantity: 1, price: 159990 },
                    { name: 'Guantes Deportivos', quantity: 1, price: 29990 }
                ],
                shipping: {
                    address: 'Calle 45 #23-12',
                    city: 'Bogotá',
                    state: 'Cundinamarca',
                    zipCode: '110111',
                    method: 'Envío Express'
                },
                paymentMethod: 'Tarjeta de Crédito',
                customerName: 'Carlos Rodríguez',
                customerEmail: 'carlos.rodriguez@email.com',
                customerPhone: '+57 300 1234567'
            }
        ];
        localStorage.setItem('motogear_orders', JSON.stringify(initialOrders));
    }
}

function loadFromLocalStorage() {
    const savedUser = localStorage.getItem('motogear_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

function saveToLocalStorage() {
    localStorage.setItem('motogear_current_user', JSON.stringify(currentUser));
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Header buttons
    document.getElementById('userBtn').addEventListener('click', handleUserClick);
    document.getElementById('adminBtn').addEventListener('click', openAdminLogin);
    document.getElementById('cartBtn').addEventListener('click', openCart);
    
    // Logo
    document.querySelector('.logo h1').addEventListener('click', () => switchView('home'));
    
    // Hero buttons
    document.getElementById('viewProductsBtn').addEventListener('click', () => switchView('catalog'));
    document.getElementById('viewOffersBtn').addEventListener('click', () => switchView('offers'));
    document.getElementById('viewCatalogBtn').addEventListener('click', () => switchView('catalog'));
    
    // Catalog
    document.getElementById('backToCatalog').addEventListener('click', () => switchView('home'));
    document.getElementById('searchInput').addEventListener('input', filterProducts);
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('sortFilter').addEventListener('change', filterProducts);
    document.getElementById('inStockFilter').addEventListener('change', filterProducts);
    
    // Forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('adminLoginForm').addEventListener('submit', handleAdminLogin);
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span>
        <span class="toast-message">${message}</span>
    `;
    
    document.getElementById('toast-container').appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== VIEWS =====
function switchView(view) {
    currentView = view;
    
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    
    if (view === 'home') {
        document.getElementById('homeView').classList.add('active');
    } else if (view === 'catalog') {
        document.getElementById('catalogView').classList.add('active');
        document.getElementById('catalogTitle').textContent = 'Catálogo de Productos';
        renderCatalogProducts();
    } else if (view === 'offers') {
        document.getElementById('catalogView').classList.add('active');
        document.getElementById('catalogTitle').textContent = 'Ofertas Especiales';
        renderCatalogProducts(true);
    }
    
    window.scrollTo(0, 0);
}

// ===== RENDER FUNCTIONS =====
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = categories.map(cat => `
        <div class="category-card">
            <div class="category-image-wrapper">
                <img src="${cat.image}" alt="${cat.name}" class="category-image">
                <div class="category-overlay"></div>
            </div>
            <div class="category-content">
                <h3 class="category-name">${cat.name}</h3>
                <p class="category-description">${cat.description}</p>
            </div>
        </div>
    `).join('');
}

function renderFeaturedProducts() {
    const grid = document.getElementById('featuredProductsGrid');
    const featured = allProducts.slice(0, 6);
    grid.innerHTML = featured.map(product => createProductCard(product)).join('');
    
    // Agregar event listeners
    grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.product-card').dataset.productId);
            addToCart(productId);
        });
    });
}

function renderCatalogProducts(onlyOffers = false) {
    let products = [...allProducts];
    
    if (onlyOffers) {
        products = products.filter(p => p.originalPrice);
    }
    
    const grid = document.getElementById('catalogProductsGrid');
    grid.innerHTML = products.map(product => createProductCard(product)).join('');
    
    // Actualizar contador
    document.getElementById('catalogSubtitle').textContent = `${products.length} productos encontrados`;
    
    // Agregar event listeners
    grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.product-card').dataset.productId);
            addToCart(productId);
        });
    });
    
    // Renderizar stats
    renderCategoryStats();
}

function createProductCard(product) {
    const discount = product.originalPrice 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;
    
    const stars = Array(5).fill(0).map((_, i) => 
        `<span class="star ${i < Math.floor(product.rating) ? 'filled' : ''}">★</span>`
    ).join('');
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-wrapper">
                ${discount > 0 ? `<div class="discount-badge">-${discount}%</div>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image">
                ${!product.inStock ? `
                    <div class="out-of-stock-overlay">
                        <div class="out-of-stock-badge">Agotado</div>
                    </div>
                ` : ''}
            </div>
            <div class="product-content">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${stars}
                    <span class="rating-text">(${product.rating})</span>
                </div>
                <div class="product-price">
                    <span class="price">$${product.price.toLocaleString()}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                <button class="btn btn-primary add-to-cart-btn" ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? 'Agregar al Carrito' : 'Agotado'}
                </button>
            </div>
        </div>
    `;
}

function renderCategoryStats() {
    const stats = document.getElementById('categoryStats');
    const categoryCounts = {
        'Cascos': allProducts.filter(p => p.category === 'Cascos').length,
        'Chaquetas': allProducts.filter(p => p.category === 'Chaquetas').length,
        'Botas': allProducts.filter(p => p.category === 'Botas').length,
        'Accesorios': allProducts.filter(p => p.category === 'Accesorios').length,
        'Pantalones': allProducts.filter(p => p.category === 'Pantalones').length
    };
    
    stats.innerHTML = Object.entries(categoryCounts).map(([cat, count]) => `
        <div class="stat-item">
            <div class="stat-value">${count}</div>
            <div class="stat-label">${cat}</div>
        </div>
    `).join('');
}

// ===== FILTERS =====
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const sortBy = document.getElementById('sortFilter').value;
    const inStockOnly = document.getElementById('inStockFilter').checked;
    
    let filtered = [...allProducts];
    
    // Filtrar por búsqueda
    if (searchTerm) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm));
    }
    
    // Filtrar por categoría
    if (category !== 'Todos') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    // Filtrar por stock
    if (inStockOnly) {
        filtered = filtered.filter(p => p.inStock);
    }
    
    // Ordenar
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });
    
    // Renderizar
    const grid = document.getElementById('catalogProductsGrid');
    grid.innerHTML = filtered.map(product => createProductCard(product)).join('');
    
    // Actualizar contador
    document.getElementById('catalogSubtitle').textContent = `${filtered.length} productos encontrados`;
    
    // Agregar event listeners
    grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.product-card').dataset.productId);
            addToCart(productId);
        });
    });
}

// ===== CART =====
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }
    
    updateCartBadge();
    showToast(`${product.name} agregado al carrito`);
}

function updateCartQuantity(productId, quantity) {
    if (quantity === 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        renderCart();
        updateCartBadge();
    }
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    renderCart();
    updateCartBadge();
    showToast('Producto eliminado del carrito');
}

function updateCartBadge() {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartBadge').textContent = count;
    document.getElementById('cartBadge').style.display = count > 0 ? 'flex' : 'none';
}

function openCart() {
    document.getElementById('cartModal').classList.add('active');
    renderCart();
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

function renderCart() {
    const cartItemsEl = document.getElementById('cartItems');
    const cartFooterEl = document.getElementById('cartFooter');
    
    if (cartItems.length === 0) {
        cartItemsEl.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
        cartFooterEl.innerHTML = '';
        return;
    }
    
    cartItemsEl.innerHTML = cartItems.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <span class="product-category">${item.category}</span>
                <div class="cart-item-price">$${item.price.toLocaleString()}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                </button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartFooterEl.innerHTML = `
        <div class="cart-total">
            <span>Total:</span>
            <span>$${total.toLocaleString()}</span>
        </div>
        <button class="btn btn-primary" onclick="handleCheckoutClick()">
            ${currentUser ? 'Proceder al Pago' : 'Iniciar Sesión para Comprar'}
        </button>
        ${!currentUser ? '<p class="cart-message">Necesitas una cuenta para proceder con la compra</p>' : ''}
        <button class="btn btn-outline" onclick="closeCart()">Continuar Comprando</button>
    `;
}

function handleCheckoutClick() {
    if (cartItems.length === 0) {
        showToast('Tu carrito está vacío', 'error');
        return;
    }
    
    if (!currentUser) {
        showToast('Debes iniciar sesión para proceder con la compra', 'error');
        pendingCheckout = true;
        closeCart();
        setTimeout(() => openAuthModal(), 100);
        return;
    }
    
    closeCart();
    setTimeout(() => openCheckout(), 100);
}

// ===== AUTH =====
function handleUserClick() {
    if (currentUser) {
        openUserProfile();
    } else {
        openAuthModal();
    }
}

function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

function switchAuthTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if (tab === 'login') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('loginTab').classList.add('active');
    } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('registerTab').classList.add('active');
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('Por favor completa todos los campos', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('motogear_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
        };
        saveToLocalStorage();
        updateUserButton();
        showToast(`¡Bienvenido de nuevo, ${user.name}!`);
        closeAuthModal();
        
        if (pendingCheckout) {
            pendingCheckout = false;
            setTimeout(() => {
                openCheckout();
                showToast('Ahora puedes continuar con tu compra');
            }, 500);
        }
    } else {
        showToast('Credenciales incorrectas. Verifica tu email y contraseña.', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        showToast('Por favor completa todos los campos', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('motogear_users') || '[]');
    
    if (users.find(u => u.email === email)) {
        showToast('Este correo electrónico ya está registrado', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        password,
        registeredDate: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        totalSpent: 0,
        status: 'Activo'
    };
    
    users.push(newUser);
    localStorage.setItem('motogear_users', JSON.stringify(users));
    
    currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone
    };
    saveToLocalStorage();
    updateUserButton();
    
    showToast(`¡Cuenta creada exitosamente! Bienvenido, ${name}!`);
    closeAuthModal();
    
    if (pendingCheckout) {
        pendingCheckout = false;
        setTimeout(() => {
            openCheckout();
            showToast('Ahora puedes continuar con tu compra');
        }, 500);
    }
}

function updateUserButton() {
    const btn = document.getElementById('userBtn');
    if (currentUser) {
        btn.classList.add('user-logged');
        btn.title = currentUser.name;
    } else {
        btn.classList.remove('user-logged');
        btn.title = 'Iniciar sesión';
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('motogear_current_user');
    updateUserButton();
    showToast('Sesión cerrada exitosamente');
    closeUserProfile();
}

// ===== USER PROFILE =====
function openUserProfile() {
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('motogear_users') || '[]');
    const orders = JSON.parse(localStorage.getItem('motogear_orders') || '[]');
    const userData = users.find(u => u.id === currentUser.id);
    const userOrders = orders.filter(o => o.userId === currentUser.id);
    
    const modal = document.getElementById('userProfileModal');
    const content = document.getElementById('userProfileContent');
    
    content.innerHTML = `
        <div style="padding: 20px;">
            <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">Mi Perfil</h2>
            
            <div style="background: var(--gray-50); padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Información Personal</h3>
                <div style="display: grid; gap: 12px;">
                    <div><strong>Nombre:</strong> ${userData?.name || currentUser.name}</div>
                    <div><strong>Email:</strong> ${userData?.email || currentUser.email}</div>
                    <div><strong>Teléfono:</strong> ${userData?.phone || currentUser.phone}</div>
                    <div><strong>Miembro desde:</strong> ${userData?.registeredDate || 'N/A'}</div>
                </div>
            </div>
            
            <div style="background: var(--gray-50); padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Estadísticas</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                    <div style="text-align: center; padding: 16px; background: white; border-radius: 8px;">
                        <div style="font-size: 24px; font-weight: 700; color: var(--primary);">${userData?.totalOrders || 0}</div>
                        <div style="font-size: 14px; color: var(--gray-600);">Pedidos</div>
                    </div>
                    <div style="text-align: center; padding: 16px; background: white; border-radius: 8px;">
                        <div style="font-size: 24px; font-weight: 700; color: var(--primary);">$${(userData?.totalSpent || 0).toLocaleString()}</div>
                        <div style="font-size: 14px; color: var(--gray-600);">Total Gastado</div>
                    </div>
                </div>
            </div>
            
            <div style="background: var(--gray-50); padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Mis Pedidos (${userOrders.length})</h3>
                ${userOrders.length > 0 ? `
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        ${userOrders.slice(0, 3).map(order => `
                            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid var(--primary);">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <strong>${order.id}</strong>
                                    <span class="badge badge-${order.status === 'Entregado' ? 'success' : order.status === 'En tránsito' ? 'info' : 'warning'}">${order.status}</span>
                                </div>
                                <div style="font-size: 14px; color: var(--gray-600);">
                                    ${order.date} - $${order.total.toLocaleString()}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p style="color: var(--gray-600); text-align: center;">No tienes pedidos aún</p>'}
            </div>
            
            <button class="btn btn-primary btn-full" style="margin-bottom: 8px;" onclick="closeUserProfile()">Cerrar</button>
            <button class="btn btn-outline btn-full" onclick="logout()">Cerrar Sesión</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeUserProfile() {
    document.getElementById('userProfileModal').classList.remove('active');
}

// ===== CHECKOUT =====
function openCheckout() {
    checkoutStep = 1;
    checkoutData = {};
    document.getElementById('checkoutModal').classList.add('active');
    renderCheckoutStep();
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function renderCheckoutStep() {
    updateCheckoutProgress();
    const content = document.getElementById('checkoutContent');
    
    switch (checkoutStep) {
        case 1:
            content.innerHTML = renderShippingForm();
            break;
        case 2:
            content.innerHTML = renderPaymentForm();
            break;
        case 3:
            content.innerHTML = renderOrderSummary();
            break;
        case 4:
            content.innerHTML = renderOrderConfirmation();
            break;
    }
}

function updateCheckoutProgress() {
    const progress = (checkoutStep / 4) * 100;
    document.getElementById('checkoutProgress').style.width = `${progress}%`;
    
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 === checkoutStep) {
            step.classList.add('active');
        } else if (index + 1 < checkoutStep) {
            step.classList.add('completed');
        }
    });
}

function renderShippingForm() {
    return `
        <div style="max-width: 600px; margin: 0 auto;">
            <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 24px;">Información de Envío</h3>
            <form id="shippingForm" class="auth-form">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                    <div class="form-group">
                        <label class="form-label">Nombre</label>
                        <input type="text" class="form-input" id="firstName" value="${currentUser?.name.split(' ')[0] || ''}" required style="padding-left: 12px;">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Apellido</label>
                        <input type="text" class="form-input" id="lastName" value="${currentUser?.name.split(' ').slice(1).join(' ') || ''}" required style="padding-left: 12px;">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-input" id="email" value="${currentUser?.email || ''}" required style="padding-left: 12px;">
                </div>
                <div class="form-group">
                    <label class="form-label">Teléfono</label>
                    <input type="tel" class="form-input" id="phone" value="${currentUser?.phone || ''}" required style="padding-left: 12px;">
                </div>
                <div class="form-group">
                    <label class="form-label">Dirección</label>
                    <input type="text" class="form-input" id="address" placeholder="Calle 123 #45-67" required style="padding-left: 12px;">
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                    <div class="form-group">
                        <label class="form-label">Ciudad</label>
                        <input type="text" class="form-input" id="city" placeholder="Bogotá" required style="padding-left: 12px;">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Departamento</label>
                        <input type="text" class="form-input" id="state" placeholder="Cundinamarca" required style="padding-left: 12px;">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Código Postal</label>
                    <input type="text" class="form-input" id="postalCode" placeholder="110111" required style="padding-left: 12px;">
                </div>
                
                <div style="margin-top: 24px;">
                    <label class="form-label" style="margin-bottom: 12px;">Método de Envío</label>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <label style="border: 2px solid var(--gray-300); padding: 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                            <input type="radio" name="shipping" value="standard" checked style="margin-right: 12px;">
                            <strong>Envío Estándar</strong> - $15,000 (5-7 días)
                        </label>
                        <label style="border: 2px solid var(--gray-300); padding: 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                            <input type="radio" name="shipping" value="express" style="margin-right: 12px;">
                            <strong>Envío Express</strong> - $30,000 (2-3 días)
                        </label>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary btn-full" style="margin-top: 24px;">Continuar al Pago</button>
            </form>
        </div>
    `;
}

function renderPaymentForm() {
    return `
        <div style="max-width: 600px; margin: 0 auto;">
            <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 24px;">Método de Pago</h3>
            <form id="paymentForm" class="auth-form">
                <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
                    <label style="border: 2px solid var(--gray-300); padding: 16px; border-radius: 8px; cursor: pointer;">
                        <input type="radio" name="payment" value="card" checked style="margin-right: 12px;">
                        <strong>Tarjeta de Crédito/Débito</strong>
                    </label>
                    <label style="border: 2px solid var(--gray-300); padding: 16px; border-radius: 8px; cursor: pointer;">
                        <input type="radio" name="payment" value="pse" style="margin-right: 12px;">
                        <strong>PSE</strong>
                    </label>
                    <label style="border: 2px solid var(--gray-300); padding: 16px; border-radius: 8px; cursor: pointer;">
                        <input type="radio" name="payment" value="paypal" style="margin-right: 12px;">
                        <strong>PayPal</strong>
                    </label>
                </div>
                
                <div id="cardDetails">
                    <div class="form-group">
                        <label class="form-label">Número de Tarjeta</label>
                        <input type="text" class="form-input" placeholder="1234 5678 9012 3456" required style="padding-left: 12px;">
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                        <div class="form-group">
                            <label class="form-label">Fecha de Expiración</label>
                            <input type="text" class="form-input" placeholder="MM/AA" required style="padding-left: 12px;">
                        </div>
                        <div class="form-group">
                            <label class="form-label">CVV</label>
                            <input type="text" class="form-input" placeholder="123" required style="padding-left: 12px;">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Nombre en la Tarjeta</label>
                        <input type="text" class="form-input" placeholder="Como aparece en la tarjeta" required style="padding-left: 12px;">
                    </div>
                </div>
                
                <div style="display: flex; gap: 12px; margin-top: 24px;">
                    <button type="button" class="btn btn-outline" onclick="checkoutStep = 1; renderCheckoutStep();" style="flex: 1;">Atrás</button>
                    <button type="submit" class="btn btn-primary" style="flex: 1;">Revisar Pedido</button>
                </div>
            </form>
        </div>
    `;
}

function renderOrderSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = checkoutData.shippingMethod === 'express' ? 30000 : 15000;
    const total = subtotal + shipping;
    
    return `
        <div style="max-width: 600px; margin: 0 auto;">
            <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 24px;">Resumen del Pedido</h3>
            
            <div style="background: var(--gray-50); padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                <h4 style="font-weight: 600; margin-bottom: 16px;">Productos (${cartItems.length})</h4>
                ${cartItems.map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                        <span>${item.name} x${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                `).join('')}
            </div>
            
            <div style="background: var(--gray-50); padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                <h4 style="font-weight: 600; margin-bottom: 16px;">Envío</h4>
                <div><strong>${checkoutData.firstName} ${checkoutData.lastName}</strong></div>
                <div style="color: var(--gray-600); font-size: 14px;">
                    ${checkoutData.address}<br>
                    ${checkoutData.city}, ${checkoutData.state} ${checkoutData.postalCode}
                </div>
            </div>
            
            <div style="background: var(--gray-50); padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toLocaleString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Envío:</span>
                    <span>$${shipping.toLocaleString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 20px; font-weight: 700; margin-top: 16px; padding-top: 16px; border-top: 2px solid var(--gray-300);">
                    <span>Total:</span>
                    <span>$${total.toLocaleString()}</span>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px;">
                <button type="button" class="btn btn-outline" onclick="checkoutStep = 2; renderCheckoutStep();" style="flex: 1;">Atrás</button>
                <button type="button" class="btn btn-primary" onclick="confirmOrder()" style="flex: 1;">Confirmar Pedido</button>
            </div>
        </div>
    `;
}

function renderOrderConfirmation() {
    const orderNumber = 'ORD-2024-' + Date.now().toString().slice(-6);
    
    return `
        <div style="max-width: 600px; margin: 0 auto; text-align: center; padding: 40px 0;">
            <div style="font-size: 64px; margin-bottom: 24px;">✓</div>
            <h3 style="font-size: 28px; font-weight: 700; margin-bottom: 16px; color: #16a34a;">¡Pedido Confirmado!</h3>
            <p style="font-size: 18px; color: var(--gray-600); margin-bottom: 32px;">
                Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
            </p>
            
            <div style="background: var(--gray-50); padding: 24px; border-radius: 12px; margin-bottom: 32px;">
                <div style="font-size: 14px; color: var(--gray-600); margin-bottom: 8px;">Número de Pedido</div>
                <div style="font-size: 24px; font-weight: 700; color: var(--primary);">${orderNumber}</div>
            </div>
            
            <p style="color: var(--gray-600); margin-bottom: 32px;">
                Recibirás un correo de confirmación en breve con los detalles de tu pedido y el seguimiento del envío.
            </p>
            
            <button class="btn btn-primary" onclick="completePurchase()" style="margin-bottom: 8px;">Continuar Comprando</button>
        </div>
    `;
}

// Event listeners para los formularios de checkout
document.addEventListener('submit', (e) => {
    if (e.target.id === 'shippingForm') {
        e.preventDefault();
        checkoutData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            postalCode: document.getElementById('postalCode').value,
            shippingMethod: document.querySelector('input[name="shipping"]:checked').value
        };
        checkoutStep = 2;
        renderCheckoutStep();
    } else if (e.target.id === 'paymentForm') {
        e.preventDefault();
        checkoutData.paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        checkoutStep = 3;
        renderCheckoutStep();
    }
});

function confirmOrder() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = checkoutData.shippingMethod === 'express' ? 30000 : 15000;
    const total = subtotal + shipping;
    
    // Guardar orden en localStorage
    const orders = JSON.parse(localStorage.getItem('motogear_orders') || '[]');
    const newOrder = {
        id: 'ORD-2024-' + Date.now().toString().slice(-6),
        userId: currentUser.id,
        date: new Date().toISOString().split('T')[0],
        status: 'Procesando',
        total: total,
        items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        shipping: {
            address: checkoutData.address,
            city: checkoutData.city,
            state: checkoutData.state,
            zipCode: checkoutData.postalCode,
            method: checkoutData.shippingMethod === 'express' ? 'Envío Express' : 'Envío Estándar'
        },
        paymentMethod: checkoutData.paymentMethod === 'card' ? 'Tarjeta de Crédito' : 
                       checkoutData.paymentMethod === 'pse' ? 'PSE' : 'PayPal',
        customerName: `${checkoutData.firstName} ${checkoutData.lastName}`,
        customerEmail: checkoutData.email,
        customerPhone: checkoutData.phone
    };
    
    orders.push(newOrder);
    localStorage.setItem('motogear_orders', JSON.stringify(orders));
    
    // Actualizar estadísticas del usuario
    const users = JSON.parse(localStorage.getItem('motogear_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].totalOrders = (users[userIndex].totalOrders || 0) + 1;
        users[userIndex].totalSpent = (users[userIndex].totalSpent || 0) + total;
        localStorage.setItem('motogear_users', JSON.stringify(users));
    }
    
    checkoutStep = 4;
    renderCheckoutStep();
}

function completePurchase() {
    cartItems = [];
    updateCartBadge();
    closeCheckout();
    switchView('home');
    showToast('¡Gracias por tu compra!');
}

// ===== ADMIN =====
function openAdminLogin() {
    document.getElementById('adminLoginModal').classList.add('active');
}

function closeAdminLogin() {
    document.getElementById('adminLoginModal').classList.remove('active');
}

function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === 'Administrador' && password === 'Admin123') {
        closeAdminLogin();
        showAdminPanel();
    } else {
        showToast('Credenciales incorrectas', 'error');
    }
}

function showAdminPanel() {
    const panel = document.getElementById('adminPanel');
    panel.style.display = 'block';
    document.getElementById('mainContent').style.display = 'none';
    document.querySelector('.header').style.display = 'none';
    
    const users = JSON.parse(localStorage.getItem('motogear_users') || '[]');
    const orders = JSON.parse(localStorage.getItem('motogear_orders') || '[]');
    
    panel.innerHTML = `
        <div class="admin-panel">
            <div class="admin-header">
                <h1 class="admin-title">Panel de Administración</h1>
                <button class="btn btn-outline" onclick="closeAdminPanel()">Cerrar Panel</button>
            </div>
            
            <div class="admin-content">
                <div class="admin-tabs">
                    <button class="admin-tab active" onclick="switchAdminTab('users')">Usuarios (${users.length})</button>
                    <button class="admin-tab" onclick="switchAdminTab('orders')">Pedidos (${orders.length})</button>
                    <button class="admin-tab" onclick="switchAdminTab('products')">Inventario (${allProducts.length})</button>
                </div>
                
                <div id="adminUsersSection" class="admin-section active">
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Gestión de Usuarios</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Pedidos</th>
                                <th>Total Gastado</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${users.map(user => `
                                <tr>
                                    <td>${user.id}</td>
                                    <td>${user.name}</td>
                                    <td>${user.email}</td>
                                    <td>${user.phone}</td>
                                    <td>${user.totalOrders || 0}</td>
                                    <td>$${(user.totalSpent || 0).toLocaleString()}</td>
                                    <td><span class="badge badge-${user.status === 'Activo' ? 'success' : 'danger'}">${user.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div id="adminOrdersSection" class="admin-section">
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Gestión de Pedidos</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Número de Pedido</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Método de Pago</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.map(order => `
                                <tr>
                                    <td><strong>${order.id}</strong></td>
                                    <td>${order.customerName}</td>
                                    <td>${order.date}</td>
                                    <td>$${order.total.toLocaleString()}</td>
                                    <td><span class="badge badge-${
                                        order.status === 'Entregado' ? 'success' :
                                        order.status === 'En tránsito' ? 'info' :
                                        order.status === 'Procesando' ? 'warning' : 'danger'
                                    }">${order.status}</span></td>
                                    <td>${order.paymentMethod}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div id="adminProductsSection" class="admin-section">
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Inventario de Productos</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${allProducts.map(product => `
                                <tr>
                                    <td>${product.id}</td>
                                    <td>${product.name}</td>
                                    <td>${product.category}</td>
                                    <td>$${product.price.toLocaleString()}</td>
                                    <td><span class="badge badge-${product.inStock ? 'success' : 'danger'}">${product.inStock ? 'En Stock' : 'Agotado'}</span></td>
                                    <td>${product.rating} ⭐</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
    
    event.target.classList.add('active');
    
    if (tab === 'users') {
        document.getElementById('adminUsersSection').classList.add('active');
    } else if (tab === 'orders') {
        document.getElementById('adminOrdersSection').classList.add('active');
    } else if (tab === 'products') {
        document.getElementById('adminProductsSection').classList.add('active');
    }
}

function closeAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    document.querySelector('.header').style.display = 'block';
}
