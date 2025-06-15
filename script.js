 // Step 1: Create our product data
 // Think of this like a digital catalog of all our products

const products = [
    {
        id: 1,
        name: "IPhone 15 Pro",
        price: 999,
        category: "phones",
        image: "images/IPhone-15-Pro.jpg",
        //image: "https://via.placeholder.com/300x200/3b82f6/white?text=iPhone+15+Pro",
        description: "The latest iPhone with amazing camera and performance"
    },

    {
        id: 2,
        name:   "MacBook Air",
        price: 1199,
        category: "laptops",
        image: "images/MacBook-Air.jpg",
        //image: "https://via.placeholder.com/300x200/10b981/white?text=MacBook+Air",
        description: "Lightweight laptop perfect for work and creativity"
    },
    {
        id: 3,
        name: "AirPods Pro",
        price: 249,
        category: "accessories",
        image: "images/AirPods-Pro.jpg",
        //image: "https://via.placeholder.com/300x200/f59e0b/white?text=AirPods+Pro",
        description:  "Wireless earbuds with noise cancellation"
    },
    {
        id: 4,
        name: "Samsung Galaxy S24",
        price: 899,
        category: "phones",
        image: "images/Samsung-Galaxy-S24.jpg",
        //image: "https://via.placeholder.com/300x200/8b5cf6/white?text=Galaxy+S24",
        description: "Android phone with incredible features"
    },
    {
        id: 5,
        name: "Dell Laptop",
        price: 799,
        category: "laptops",
        image: "images/Dell-Laptop.jpg",
        //image: "https://via.placeholder.com/300x200/06b6d4/white?text=Dell+Laptop",
        description: "Reliable laptop for everyday computing"
    },
    {
        id: 6,
        name: "Wireless Mouse", 
        price: 49,
        category: "accessories", 
        image: "images/Wireless-Mouse.jpg",
        //image: "https://via.placeholder.com/300x200/ec4899/white?text=Wireless+Mouse",
        description: "Ergonomic wireless mouse for productivity"
    }
];

// Steps 2: Create our shooping cart
// This will store all items that customer want to buy

let cart = [];

 // Step 3: Get references to HTML elements
 // This connects our JavaScript to specific parts of our webpage 
 const cartCountElements = document.getElementById('cart-count');
 const productsGrid = document.getElementById('products-grid');
 const featuredProducts = document.getElementById('featured-products');

 // Step 4: Utility function to format prices 
 // This makes "$999.00" instead of just "999"
function formatPrice(price) {
    return '$' + price.toFixed(2);
}

console.log('JavaScript loaded successfully!');
console.log('We have', products.length, 'products.');

// Function to create HTML for one product card
function createProductCard(product) {
    //Template literals (backticks) let us create HTML with JavaScript
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-small" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-secondary btn-small" onclick="viewProduct(${product.id})">View Details</button>
                </div>
            </div>
        </div>
    `;
}

// Function to display products on the page
function displayProducts(productsToShow = products) {
    // If we're on the products page
    if (productsGrid) {
        // Create HTML for each product and join them together
        const productsHTML = productsToShow.map(createProductCard).join('');
        productsGrid.innerHTML = productsHTML;
    }

    // If we're on the homepage, show first 3 products as featured
    if (featuredProducts) {
        const featuredHTML = productsToShow.slice(0, 3).map(createProductCard).join('');
        featuredProducts.innerHTML = featuredHTML;
    }
}

// Function to add product to cart (we'll build this next)
function addToCart(products) {
    alert('Adding product ' + productId + 'to cart! (We\'ll  build this feature next)');
}

// Function to view product details
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    alert('Product: '+ product.name + '\nPrice: '+ formatPrice(product.price) + '\nCategory: '+ product.category + '\nImage: '+ product.image + '\nDescription: '+ product.description);
}

// Wait for the page to load, then display products
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page Loaded, displaying products...');
    displayProducts();
});

// Function to handle filter button clicks
function setupFilters() {
    //Get all filter buttons
    const filterButtons =  document.querySelectorAll('.filter-btn');

    // Add click event to each button 
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to clicked button
            this.classList.add('active');

            //Get the category from the button's data-category attribute
            const category = this.getAttribute('data-category');

            //Filter products based on category
            let filteredProducts;
            if (category === 'all') {
                filteredProducts = products; //Show all products
            } else {
                filteredProducts = products.filter(product => product.category === category);
            }

            //Display the filtered products
            displayProducts(filteredProducts);

            console.log('Showing', filteredProducts.length, 'products in category: ', category);
        });
    });   
}

//Update our page load function
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, displaying products...');
    displayProducts();
    setupFilters();  //Add this line
});

// Update cart count display
function updateCartCount() {
    //Calculate total number of items in cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update the cart count in navigation
    if (cartCountElements) {
        cartCountElements.textContent = totalItems;
    }

    console.log('Cart now has', totalItems, 'items');
}

// Save cart to browser storage so it persists between page visits
function saveCart() {
    localStorage.setItem('techvibe-cart', JSON.stringify(cart));
}

//Load cart from browser storage
function loadCart() {
    const saveCart = localStorage.getItem('techvibe-cart');
    if(saveCart) {
        cart = JSON.parse(saveCart);
        updateCartCount();
        console.log('Loaded cart with', cart.length, 'different products');
    }
}

// Add products to cart
function addToCart(productId) {
    //Find the product in our products array
    const product = products.find(p => p.id === productId);
    if(!product) {
        console.error('Product not found!');
        return;
    }

    //Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);

    if(existingItem) {
        // If it's alrady in cart, increase quantity
        existingItem.quantity += 1;
        console.log('Increased quantity of', product.name, 'to', existingItem.quantity);
    } else {
        //If it's new, add it to cart
        cart.push ({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        console.log('Added', product.name, 'to cart');
    }

    updateCartCount();
    saveCart();
    showNotification(product.name + ' added to cart!');
}

// Show notification when item is added 
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update our page load function to load the cart
document.addEventListener('DOMContentLoaded', function(){
    console.log('Page loaded, displaying products...');
    loadCart();  //Load saved cart
    displayProducts();
    setupFilters();
});

//Function to update item quantity in cart
function updateQuantity(productId, newQuantity) {
    console.log('Updating quantity for products', productId, 'to', newQuantity);

    //Find the item in our cart
    const item = cart.find(item => item.id === productId);
    if (item) {
        if(newQuantity <= 0) {
            //If quantity is 0 or less, remove the item
            removeFromCart(productId);
        } else {
            //Update the quantity
            item.quantity = newQuantity;
            updateCartCount();
            saveCart();
            displayCartItems();
            updateCartSummary();
        }
    }
}

//Function to remove item from cart
function removeFromCart(productId) {
    console.log('Removing product', productId, 'from cart');

    //Filter out the item we want to remove
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCart();
    displayCartItems();
    updateCartSummary();
    showNotification('Item removed from cart');
}

//Function to create HTML for cart item
function createCartItemHTML(item) {
    return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">${formatPrice(item.price)} each</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                </div>
                <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove Item</button>
            </div>
        </div>
    `;
}

//Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartElement = document.getElementById('empty-cart');

    // Only run this code if we're on the cart page
    if(!cartItemsContainer) return;

    if(cart.length === 0) {
        //Show empty cart message
        cartItemsContainer.style.display = 'none';
        if(emptyCartElement) emptyCartElement.style.display = 'block';
        document.querySelector('.cart-summary').style.display = 'none';
    } else {
        //Show empty cart message
        cartItemsContainer.style.display = 'block';
        if (emptyCartElement) emptyCartElement.style.display = 'none';
        document.querySelector('.cart-summary').style.display = 'block';

        //Create HTML for all cart Items
        cartItemsContainer.innerHTML = cart.map(createCartItemHTML).join('');
    }
}

//Function to calculate and update cart summary
function updateCartSummary() {
    //Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 9.99 : 0;
    const tax = subtotal * 0.08; //8% tax
    const total = subtotal + shipping + tax;

    //Update the display
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const taxElement = document.getElementById('cart-tax');
    const totalElement = document.getElementById('cart-total');

    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (shippingElement) shippingElement.textContent = shipping > 0 ? formatPrice(shipping) : 0;
    if (taxElement) taxElement.textContent = formatPrice(tax);
    if (totalElement) totalElement.textContent = formatPrice(total);

    console.log('Cart summary - Subtotal:', formatPrice(subtotal), 'Total:', formatPrice(total));
}

//Function to go to checkout
function goToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    window.location.href = 'checkout.html';
}

//Update our page load function to handle cart page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, displaying products...');
    loadCart();
    displayProducts();
    setupFilters();

    //If we're on the cart page, display cart items
    if (document.getElementById('cart-items')) {
        displayCartItems();
        updateCartSummary();
    }
});

/**SartHere/ */
//Function to display checkout items
function displayCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    if(!checkoutItemsContainer || cart.length === 0) return;

    const itemsHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}" class="checkout-item-image"></img>
            <div class="checkout-item-details">
                <div class="checkout-item-name">${item.name}</div>
                <div class="checkout-item-quantity">Qty: ${item.quantity}</div>
            </div>
            <div class="checkout-item-price">${formatPrice(item.price * item.quantity)}</div>
        </div>
    `).join('');

    checkoutItemsContainer.innerHTML = itemsHTML;
}

//Function to update checkout summary
function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 9.99 : 0;
    const tax = subtotal * 0.08; //8% tax
    const total = subtotal + shipping + tax;

    //Update checkout summary elements
    const subtotalElement = document.getElementById('checkout-subtotal');
    const shippingElement = document.getElementById('checkout-shipping');
    const taxElement = document.getElementById('checkout-tax');
    const totalElement = document.getElementById('checkout-total');

    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (shippingElement) shippingElement.textContent = shipping > 0 ? formatPrice(shipping) : 0;
    if (taxElement) taxElement.textContent = formatPrice(tax);
    if (totalElement) totalElement.textContent = formatPrice(total);
}

// Simple form validatation functions
function validateEmail(email) {
    //Check if email contains @ and .
    return email.includes('@') && email.includes('.');
}

function validateCardNumber(cardNumber) {
    //Remove spaces and checks if its 16 digits
    const cleanNumber = cardNumber.replace(/\s/g, '');
    return /^\d{16}$/.test(cleanNumber); 
}

//Function to process the order (simulate)
function processOrder(formData) {
    //In a real website, this would send data to the a server
    // For now, we'll just simulate it with a delay
    return new Promise((resolve) => {
        setTimeout(() => {
            // Clear the cart after successful order
            cart = [];
            updateCartCount();
            saveCart();
            resolve({
                success: true,
                orderNumber: 'TV-' + Date.now(), 
                message: 'Your order has been placed successfully!'
            });
        }, 2000);
    });
}

// Function to show order success
function showOrderSuccess(orderInfo) {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="success-message">
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase!</p>
            <p><strong>Order Number:</strong> ${orderInfo.orderNumber}</p>
            <p>You will receive a confirmation email shortly.</p>
            <a href="index.html" class="btn btn-primary">Continue Shopping</a>
        </div>
    `;
}

//Update our page load function to handle checkout
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded...')
    loadCart();
    displayProducts();
    setupFilters();

    //Cart page
    if (document.getElementById('cart-items')) {
        displayCartItems();
        updateCartSummary();
    }

    //Checkout page
    if (document.getElementById('checkout-form')) {
        // Redirect if cart is empty
        if (cart.length === 0) {
            alert('Your cart is empty');
            window.location.href = 'products.html';
            return;
        }

        displayCheckoutItems();
        updateCheckoutSummary();

        //Handle form submission
        const checkoutForm = document.getElementById('checkout-form');
        checkoutForm.addEventListener('submit', async function(e) {
            e.preventDefault();  //Prevent normal form submission

            //Get form data
            const formData = new FormData(checkoutForm);
            const data = Object.fromEntries(formData);

            //Simple validation
            let isValid = true;
            const errors = [];

            if (!validateEmail(data.email)) {
                errors.push('Please enter a valid email address');
                isValid = false;
            }
            if (!validateCardNumber(data.cardNumber)) {
                errors.push('Please enter a valid 16-digits card numbers');
                isValid = false;
            }
            if (!isValid) {
                alert('Please fix the following errors:\n' + errors.join('\n'));
                return;
            }

            // Showing loading state
            const submitBtn = checkoutForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            try {
                const results = await processOrder(data);
                if(results.success) {
                    showOrderSuccess(results);
                }
            }catch (error) {
                alert('There was an error processing your order. Please try again.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Function to handle contact form submission 
function handleContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault() //Stop the form from submitting normally

            //Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            //Simple validation 
            let isValid = true;
            const errors = [];

            if (!data.name.trim()) {
                errors.push('Name is required');
                isValid = false;
            }

            if (!validateEmail(data.email)) {
                errors.push('Please enter a valid email address');
                isValid = false;
            }

            if (!data.subject) {
                errors.push('Please select a subject');
                isValid = false
            }

            if (!data.message.trim()) {
                errors.push('Message is required');
                isValid = false;
            } else if (data.message.trim().length < 10) {
                errors.push('Message must be at least 10 characters long');
                isValid = false;
            }

            if (!isValid) {
                alert('Please fix the following errors:\n' + errors.join('\n'));
                return;
            }

            //Showing loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...'
            submitBtn.disabled = true;

            //Simulate sending the message
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();  //Clear the form
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

//Update our main page load function
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded...');
    loadCart();
    displayProducts();
    setupFilters();

    // Cart page
    if (document.getElementById('cart-items')) {
        displayCartItems();
        updateCartSummary();
    }

    //Checkout page
    if (document.getElementById('checkout-form')) {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            window.location.href = 'products.html';
            return;
        }

        displayCheckoutItems();
        updateCartSummary();

        const checkoutForm = document.getElementById('checkout-form');
        checkoutForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(checkoutForm);
            const data = Object.fromEntries(formData);

            let isValid = true;
            const errors = [];

            if (!validateEmail(data.email)) {
                errors.push('Please enter a valid email address');
                isValid = false;
            }

            if (!validateCardNumber(data.cardNumber)) {
                errors.push('Please enter a valid 16-digits card numbers');
                isValid = false;
            }

            if (!isValid) {
                alert('Please fix the following errors:\n' + errors.join('\n'));
                return;
            }

            // Showing loading state
            const submitBtn = checkoutForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            try {
                const result = await processOrder(data);
                if(result.success) {
                    showOrderSuccess(result);
                }
            }catch (error) {
                alert('There was an error processing your order. Please try again.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    } 

    // Contact page
    handleContactForm();
});