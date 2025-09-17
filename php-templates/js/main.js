// Cart functionality
const cartFunctions = {
    addToCart: function(productId, quantity = 1) {
        fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity })
        })
        .then(response => response.json())
        .then(data => {
            this.updateCartCount(data.totalItems);
            this.animateCartIcon();
        });
    },

    updateCartCount: function(count) {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.classList.remove('hidden');
        }
    },

    animateCartIcon: function() {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.classList.add('animate-cart-bump');
            setTimeout(() => {
                cartIcon.classList.remove('animate-cart-bump');
            }, 300);
        }
    },

    updateQuantity: function(productId, quantity) {
        fetch('/api/cart/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity })
        })
        .then(response => response.json())
        .then(data => {
            this.updateCartTotals(data);
        });
    },

    removeFromCart: function(productId) {
        fetch('/api/cart/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId })
        })
        .then(response => response.json())
        .then(data => {
            this.updateCartTotals(data);
            document.querySelector(`[data-product-id="${productId}"]`)?.remove();
        });
    },

    updateCartTotals: function(data) {
        const { subtotal, total, totalItems } = data;
        document.querySelector('.cart-subtotal')?.textContent = `${subtotal} грн`;
        document.querySelector('.cart-total')?.textContent = `${total} грн`;
        this.updateCartCount(totalItems);
    }
};

// Mobile menu
const mobileMenu = {
    toggle: function() {
        const menu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (menu && overlay) {
            menu.classList.toggle('hidden');
            overlay.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        }
    },

    close: function() {
        const menu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (menu && overlay) {
            menu.classList.add('hidden');
            overlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    }
};

// Catalog filters
const catalogFilters = {
    toggle: function() {
        const filters = document.querySelector('.catalog-filters');
        if (filters) {
            filters.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        }
    },

    close: function() {
        const filters = document.querySelector('.catalog-filters');
        if (filters) {
            filters.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    apply: function(form) {
        const formData = new FormData(form);
        const params = new URLSearchParams(formData);
        window.location.search = params.toString();
    }
};

// Product gallery
const productGallery = {
    init: function() {
        const thumbs = document.querySelectorAll('.product-thumb');
        const mainImage = document.querySelector('.product-main-image');
        
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const src = thumb.getAttribute('data-src');
                if (mainImage && src) {
                    mainImage.src = src;
                    thumbs.forEach(t => t.classList.remove('border-primary'));
                    thumb.classList.add('border-primary');
                }
            });
        });
    }
};

// Initialize components
document.addEventListener('DOMContentLoaded', function() {
    // Init product gallery if on product page
    if (document.querySelector('.product-gallery')) {
        productGallery.init();
    }

    // Setup mobile menu click handlers
    document.querySelector('.mobile-menu-button')?.addEventListener('click', () => mobileMenu.toggle());
    document.querySelector('.mobile-menu-overlay')?.addEventListener('click', () => mobileMenu.close());

    // Setup filter handlers
    document.querySelector('.filter-button')?.addEventListener('click', () => catalogFilters.toggle());
    document.querySelector('.close-filters')?.addEventListener('click', () => catalogFilters.close());

    // Setup cart handlers
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.currentTarget.getAttribute('data-product-id');
            if (productId) {
                cartFunctions.addToCart(productId);
            }
        });
    });
});