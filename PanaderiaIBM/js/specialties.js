document.addEventListener('DOMContentLoaded', function() {
    // Specialty items data - only signature items
    const signatureData = [
        {
            id: 'signature-1',
            name: 'The "Future Proof" Sourdough',
            price: 12.50,
            description: 'Our signature Artisan Continuum Loaf crafted with locally-sourced heritage grains and a decades-old mother starter. Exceptional depth of flavor with a wonderfully chewy crumb and improved digestibility.',
            image: '../assets/images/future-proof-sourdough.jpg',
            badge: 'Signature',
            availability: 'Available Daily'
        },
        {
            id: 'signature-2',
            name: 'Continuum Kit & Tutorial',
            price: 28.95,
            description: 'Take home our DIY kit with pre-measured premium ingredients and our unique starter. Includes access to exclusive online tutorials and workshops to create your own Future Proof loaf at home.',
            image: '../assets/images/continuum-kit.jpg',
            badge: 'Interactive',
            availability: 'Limited Weekly Availability'
        },
        {
            id: 'signature-3',
            name: 'Bake with the Future Sessions',
            price: 15.00,
            description: 'Join our monthly live Q&A video sessions with our head baker. Learn professional techniques, troubleshoot your baking challenges, and become part of our sourdough community.',
            image: '../assets/images/baking-session.jpg',
            badge: 'Experience',
            availability: 'Monthly Sessions'
        }
    ];

    // Function to create a specialty item card
    function createSpecialtyItem(item) {
        const specialtyElement = document.createElement('div');
        specialtyElement.className = 'col-md-6 col-lg-4';
        
        let badgeHTML = '';
        if (item.badge) {
            badgeHTML = `<div class="specialty-badge">${item.badge}</div>`;
        }
        
        let availabilityHTML = '';
        if (item.availability) {
            availabilityHTML = `<div class="specialty-available">${item.availability}</div>`;
        }
        
        specialtyElement.innerHTML = `
            <div class="specialty-item">
                ${badgeHTML}
                <img src="${item.image}" alt="${item.name}" onerror="this.src='../assets/images/placeholder.jpg'">
                <div class="content">
                    <h3>${item.name}</h3>
                    <div class="price">$${item.price.toFixed(2)}</div>
                    ${availabilityHTML}
                    <p>${item.description}</p>
                    <button class="btn btn-sm add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        return specialtyElement;
    }
    
    // Function to populate signature container
    function populateSignatureContainer() {
        const signatureContainer = document.getElementById('signature-container');
        if (signatureContainer) {
            if (signatureData.length > 0) {
                signatureData.forEach(item => {
                    signatureContainer.appendChild(createSpecialtyItem(item));
                });
            } else {
                // Add empty state message (should never happen with your data)
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'col-12';
                emptyMessage.innerHTML = '<div class="empty-specialty">Signature specialties coming soon!</div>';
                signatureContainer.appendChild(emptyMessage);
            }
        }
    }
    
    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-to-cart')) {
            const itemId = e.target.getAttribute('data-id');
            
            // Find the item data
            const itemData = signatureData.find(item => item.id === itemId);
            
            if (itemData) {
                // Add item to cart in localStorage
                addToCart(itemData);
                
                // Give feedback to user
                e.target.textContent = 'Added!';
                setTimeout(() => {
                    e.target.textContent = 'Add to Cart';
                }, 1500);
            }
        }
    });
    
    // Add to cart function
    function addToCart(item) {
        // Get existing cart or initialize empty array
        let cart = [];
        const savedCart = localStorage.getItem('bakeryCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        
        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingItemIndex !== -1) {
            // Item exists, increase quantity
            cart[existingItemIndex].quantity += 1;
        } else {
            // Item doesn't exist, add it with quantity 1
            cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1
            });
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('bakeryCart', JSON.stringify(cart));
        
        // Update cart counter if it exists
        updateCartCounter();
    }
    
    // Update cart counter
    function updateCartCounter() {
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            const savedCart = localStorage.getItem('bakeryCart');
            if (savedCart) {
                const cart = JSON.parse(savedCart);
                let itemCount = 0;
                cart.forEach(item => {
                    itemCount += item.quantity;
                });
                cartCounter.textContent = itemCount;
                cartCounter.style.display = itemCount > 0 ? 'block' : 'none';
            }
        }
    }
    
    // Initial cart counter update
    updateCartCounter();
    
    // Populate specialty items
    populateSignatureContainer();
});