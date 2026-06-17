export let cart;
loadFromStorage();

export function loadFromStorage() {
    const raw = localStorage.getItem("cart");
    try {
        cart = JSON.parse(raw);
    } catch (e) {
        cart = null;
    }

    if (!cart || cart.length === 0) {
        cart = [];
        saveToLocalStorage();
    }
}

function saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
    // Notify other modules/UI that the cart changed
    window.dispatchEvent(new CustomEvent("cartUpdated"));
}

export function addToCart(productId) {
    const matchingItem = cart.find((ci) => ci.productId === productId);
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: "1",
        });
    }
    saveToLocalStorage();
}

export function removeFromCart(productId) {
    cart = cart.filter((item) => item.productId !== productId);
    saveToLocalStorage();
}

export function updateCartQuantity(productId, newQuantity) {
    const item = cart.find((i) => i.productId === productId);
    if (item) {
        item.quantity = newQuantity;
        saveToLocalStorage();
    }
}

export function updateDeliveryOptions(productId, deliveryOptionId) {
    const item = cart.find((i) => i.productId === productId);
    if (item) {
        item.deliveryOptionId = deliveryOptionId;
        saveToLocalStorage();
    }
}