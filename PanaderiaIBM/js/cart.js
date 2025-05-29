document.addEventListener('DOMContentLoaded', function() {
    // Sample cart data - in a real app, this would come from localStorage or a session
    let cart = [];
    
    // DOM elements
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
    
    // Constants
    const TAX_RATE = 0.10;
    const DELIVERY_FEE = 5.00;
    
    // Load cart data from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('bakeryCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        
        updateCartDisplay();
        updateCartCounter();
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('bakeryCart', JSON.stringify(cart));
    }
    
    // Update the cart display
    function updateCartDisplay() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '';
            emptyCartMessage.style.display = 'block';
            checkoutBtn.disabled = true;
            updateOrderSummary();
            return;
        }
        
        emptyCartMessage.style.display = 'none';
        checkoutBtn.disabled = false;
        
        // Clear and rebuild cart items
        cartItemsContainer.innerHTML = '';
        
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='../assets/images/placeholder.jpg'">
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-price">$${item.price.toFixed(2)} each</p>
                </div>
                <div class="item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
                        <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-index="${index}">
                        <button class="quantity-btn increase-btn" data-index="${index}">+</button>
                    </div>
                    <button class="remove-btn" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            `;
            
            cartItemsContainer.appendChild(itemElement);
        });
        
        // Add event listeners to cart controls
        addCartControlListeners();
        
        // Update order summary
        updateOrderSummary();
    }
    
    // Add event listeners to cart item controls
    function addCartControlListeners() {
        // Decrease quantity buttons
        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    updateCartDisplay();
                    saveCart();
                    updateCartCounter();
                }
            });
        });
        
        // Increase quantity buttons
        document.querySelectorAll('.increase-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart[index].quantity++;
                updateCartDisplay();
                saveCart();
                updateCartCounter();
            });
        });
        
        // Quantity input fields
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const quantity = parseInt(this.value);
                
                if (quantity > 0) {
                    cart[index].quantity = quantity;
                } else {
                    this.value = 1;
                    cart[index].quantity = 1;
                }
                
                updateCartDisplay();
                saveCart();
                updateCartCounter();
            });
        });
        
        // Remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCartDisplay();
                saveCart();
                updateCartCounter();
            });
        });
    }
    
    // Update order summary
    function updateOrderSummary() {
        let subtotal = 0;
        
        // Calculate subtotal
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        
        // Calculate tax
        const tax = subtotal * TAX_RATE;
        
        // Check if delivery is selected
        let deliveryFee = 0;
        const deliverySelected = document.getElementById('delivery').checked;
        if (deliverySelected) {
            deliveryFee = DELIVERY_FEE;
        }
        
        // Calculate total
        const total = subtotal + tax + deliveryFee;
        
        // Update display
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Update cart counter
    function updateCartCounter() {
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            let itemCount = 0;
            cart.forEach(item => {
                itemCount += item.quantity;
            });
            cartCounter.textContent = itemCount;
            cartCounter.style.display = itemCount > 0 ? 'block' : 'none';
        }
    }
    
    // Update cart counter
    function updateCartCounter() {
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            let itemCount = 0;
            cart.forEach(item => {
                itemCount += item.quantity;
            });
            cartCounter.textContent = itemCount;
            cartCounter.style.display = itemCount > 0 ? 'block' : 'none';
        }
    }
    
    // Handle order type change
    orderTypeRadios.forEach(radio => {
        radio.addEventListener('change', updateOrderSummary);
    });
    
    // Handle checkout button
    checkoutBtn.addEventListener('click', function() {
        alert('Checkout functionality will be implemented here.');
        // In a real application, this would redirect to a checkout page or process
    });
    
    // Add item to cart (for testing)
    function addTestItems() {
        if (cart.length === 0) {
            // Only add test items if cart is empty
            cart.push({
                id: 'bread-1',
                name: 'Sunrise Sourdough Loaf',
                price: 8.00,
                image: '../assets/images/sourdough.jpg',
                quantity: 1
            });
            
            cart.push({
                id: 'pastry-2',
                name: 'Almond Bliss Danish',
                price: 4.50,
                image: '../assets/images/danish.jpg',
                quantity: 2
            });
            
            saveCart();
        }
    }
    
    // Initialize cart
    loadCart();
    
    // For testing - comment out in production
    // addTestItems();
});