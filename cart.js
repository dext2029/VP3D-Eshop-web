// Your Stripe Publishable Key
const stripe = Stripe("pk_live_51R6YCwCcExQUewZvYi7JmsjAB6e3yxZsYW1zN0ukheNJgNZzBKwGx7j9uqnDFhlIAliIVZ4saZZAvjMKTrMU7tRt000E6BwYh2"); // Replace with your actual key

// Initialize an empty cart if none exists in localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart icon and count
function updateCartIcon() {
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;
}

// Function to add items to the cart
function addToCart(productId, productName, productPrice, stripePriceId) {
    // Check if the item is already in the cart
    let item = cart.find(i => i.id === productId);
    
    if (item) {
        item.quantity += 1; // Increase quantity if item is already in the cart
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, stripePriceId: stripePriceId, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon(); // Update the cart count on the icon
}

// Function to handle checkout
async function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let lineItems = cart.map(item => ({
        price: item.stripePriceId, // Stripe's predefined Price ID
        quantity: item.quantity
    }));

    try {
        const { error } = await stripe.redirectToCheckout({
            lineItems: lineItems,
            mode: "payment",
            successUrl: "https://dext2029.github.io/VP3D-Eshop-web/success.html",
            cancelUrl: "https://dext2029.github.io/VP3D-Eshop-web/cancel.html",
        });

        if (error) {
            console.error("Error during checkout:", error);
        }
    } catch (error) {
        console.error("Checkout failed:", error);
    }
}

// Update cart count when the page loads
document.addEventListener('DOMContentLoaded', updateCartIcon);
