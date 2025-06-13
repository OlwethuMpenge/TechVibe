 // Step 1: Create our product data
 // Think of this like a digital catalog of all our products

const products = [
    {
        id: 1,
        name: "IPhone 15 pro",
        price: 999,
        category: "phones",
        image:  "https://via.placeholder.com/300x200/3b82f6/white?text=iPhone+15+Pro",
        description: "The latest iPhone with amazing camera and performance"
    },

    {
        id: 2,
        name:   "MacBook Air",
        price: 1199,
        category: "laptops",
        image:  "https://via.placeholder.com/300x200/10b981/white?text=MacBook+Air",
        description: "Lightweight laptop perfect for work and creativity"
    },
    {
        id: 3,
        name: "AirPods Pro",
        price: 249,
        category: "accessories",
        image:  "https://via.placeholder.com/300x200/3b82f6/white?text=iPhone+15+Pro",
        description:  "Wireless earbuds with noise cancellation"
    },
    {
        id: 4,
        name: "Samsung Galaxy S24",
        price: 899,
        category: "phones",
        image:    "https://via.placeholder.com/300x200/8b5cf6/white?text=Galaxy+S24",
        description: "Android phone with incredible features"
    },
    {
        id: 5,
        name: "Dell Laptop",
        price: 799,
        category: "laptops",
        image:  "https://via.placeholder.com/300x200/06b6d4/white?text=Dell+Laptop",
        description: "Reliable laptop for everyday computing"
    },
    {
        id: 6,
        name: "Wireless Mouse", 
        price: 49,
        category: "accessories", 
        image: "https://via.placeholder.com/300x200/ec4899/white?text=Wireless+Mouse",
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