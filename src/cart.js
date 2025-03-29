// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update the cart count in the UI
function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

// Add item to cart
function addToCart(item) {
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Load cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        document.getElementById("cart-count").textContent = cart.length;
    }

    function addToCart(product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    // Attach event listener to all "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent page reload

            const product = {
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image
            };

            addToCart(product);
        });
    });

    // Update count on page load
    updateCartCount();
});
