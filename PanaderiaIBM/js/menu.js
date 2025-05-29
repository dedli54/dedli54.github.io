document.addEventListener('DOMContentLoaded', function() {
    // Menu items data
    const breadsData = [
        {
            id: 'bread-1',
            name: 'Sunrise Sourdough Loaf',
            price: 8.00,
            description: 'Our signature tangy sourdough with a perfectly crisp crust and soft, airy crumb.',
            image: '../assets/images/sourdough.jpg'
        },
        {
            id: 'bread-2',
            name: 'Homestyle Honey Wheat',
            price: 7.00,
            description: 'A soft, slightly sweet whole wheat bread, wonderful for sandwiches or toast.',
            image: '../assets/images/honey-wheat.jpg'
        },
        {
            id: 'bread-3',
            name: 'Rustic Rosemary & Sea Salt Focaccia',
            price: 6.00,
            description: 'Chewy Italian flatbread infused with rosemary and sprinkled with sea salt. (Quarter Slab)',
            image: '../assets/images/focaccia.jpg'
        }
    ];

    const pastriesData = [
        {
            id: 'pastry-1',
            name: 'Classic Butter Croissant',
            price: 4.00,
            description: 'Flaky, buttery, and light – a true Parisian experience.',
            image: '../assets/images/croissant.jpg'
        },
        {
            id: 'pastry-2',
            name: 'Almond Bliss Danish',
            price: 4.50,
            description: 'Sweet almond paste filling nestled in a tender pastry, topped with toasted almonds.',
            image: '../assets/images/danish.jpg'
        },
        {
            id: 'pastry-3',
            name: 'Morning Glory Muffin',
            price: 3.75,
            description: 'Packed with carrots, apple, raisins, and walnuts with a hint of spice.',
            image: '../assets/images/muffin.jpg'
        }
    ];

    const cakesData = [
        {
            id: 'cake-1',
            name: 'Velvet Chocolate Dream Cake',
            price: 6.50,
            description: 'Rich, moist chocolate cake with a silky chocolate ganache frosting. (Slice)',
            image: '../assets/images/chocolate-cake.jpg'
        },
        {
            id: 'cake-2',
            name: 'Lemon Zest Pound Cake',
            price: 5.75,
            description: 'Buttery pound cake with a bright, refreshing lemon glaze. (Slice)',
            image: '../assets/images/lemon-cake.jpg'
        },
        {
            id: 'cake-3',
            name: 'Giant Chewy Ginger Molasses Cookie',
            price: 3.00,
            description: 'A perfectly spiced, soft, and chewy cookie that warms the soul.',
            image: '../assets/images/ginger-cookie.jpg'
        }
    ];

    // Function to create a menu item
    function createMenuItem(item) {
        const menuItem = document.createElement('div');
        menuItem.className = 'col-md-6 col-lg-4';
        
        menuItem.innerHTML = `
            <div class="menu-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='../assets/images/placeholder.jpg'">
                <div class="content">
                    <h3>${item.name}</h3>
                    <div class="price">$${item.price.toFixed(2)}</div>
                    <p>${item.description}</p>
                    <button class="btn btn-sm add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        return menuItem;
    }
    
    // Function to populate menu containers
    function populateMenuContainers() {
        // Populate breads
        const breadsContainer = document.getElementById('breads-container');
        if (breadsContainer) {
            breadsData.forEach(bread => {
                breadsContainer.appendChild(createMenuItem(bread));
            });
        }
        
        // Populate pastries
        const pastriesContainer = document.getElementById('pastries-container');
        if (pastriesContainer) {
            pastriesData.forEach(pastry => {
                pastriesContainer.appendChild(createMenuItem(pastry));
            });
        }
        
        // Populate cakes
        const cakesContainer = document.getElementById('cakes-container');
        if (cakesContainer) {
            cakesData.forEach(cake => {
                cakesContainer.appendChild(createMenuItem(cake));
            });
        }
    }
    
    // Function to check if containers are empty and add a message
    function checkEmptyContainers() {
        const containers = ['breads-container', 'pastries-container', 'cakes-container'];
        
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container && container.children.length === 0) {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'col-12';
                emptyMessage.innerHTML = '<div class="empty-menu">Menu items coming soon!</div>';
                container.appendChild(emptyMessage);
            }
        });
    }
    
    // Fix for tab initialization
    const triggerTabList = document.querySelectorAll('#menu-tabs button');
    triggerTabList.forEach(triggerEl => {
        triggerEl.addEventListener('click', function(event) {
            event.preventDefault();
            
            // First, remove active class from all tabs
            document.querySelectorAll('#menu-tabs button').forEach(tab => {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            });
            
            // Hide all tab panes
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            
            // Activate the clicked tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Show the corresponding tab content
            const targetPaneId = this.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetPaneId);
            if (targetPane) {
                targetPane.classList.add('show', 'active');
            }
        });
    });
    
    // Make sure only the default tab is showing on page load
    const defaultTab = document.querySelector('#menu-tabs button.active');
    if (defaultTab) {
        const targetPaneId = defaultTab.getAttribute('data-bs-target');
        const targetPane = document.querySelector(targetPaneId);
        if (targetPane) {
            // Hide all panes first
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            // Show only the default pane
            targetPane.classList.add('show', 'active');
        }
    }
    
    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-to-cart')) {
            const itemId = e.target.getAttribute('data-id');
            
            // Find the item data
            let itemData;
            if (itemId.startsWith('bread')) {
                itemData = breadsData.find(item => item.id === itemId);
            } else if (itemId.startsWith('pastry')) {
                itemData = pastriesData.find(item => item.id === itemId);
            } else if (itemId.startsWith('cake')) {
                itemData = cakesData.find(item => item.id === itemId);
            }
            
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
    
    // Populate menu items
    populateMenuContainers();
    
    // Check for empty containers after populating
    checkEmptyContainers();
});