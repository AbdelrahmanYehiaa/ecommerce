// Cart state and checkout flows

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId, quantity, size) {
  const product = getProducts().find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(
    (item) => item.id === productId && item.size === size
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
}

function loadCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const totalAmount = document.getElementById("total-amount");
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Cart is empty</p>";
    if (totalAmount) totalAmount.textContent = "$0";
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>Size: ${item.size} | Quantity: ${item.quantity}</p>
          </div>
          <div class="cart-item-price">$${item.price * item.quantity}</div>
        </div>`
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`;
}

function setupCheckoutForm() {
  const checkoutForm = document.getElementById("checkout-form");
  if (!checkoutForm) return;
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateCheckoutForm()) submitOrder();
  });
}

function validateCheckoutForm() {
  const phone = document.getElementById("phone").value;
  const name = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;

  if (!phone || phone.length < 10) {
    showNotification("Phone number is required and must be valid", "error");
    return false;
  }
  if (!name || !email || !address || !city || !country) {
    showNotification("Please fill in all required fields", "error");
    return false;
  }
  return true;
}

function submitOrder() {
  showNotification("Processing your order...", "info");
  setTimeout(() => {
    showNotification(
      "Order submitted successfully! We will contact you soon",
      "success"
    );
    cart = [];
    localStorage.removeItem("cart");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  }, 2000);
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartCounter();
  if (window.location.pathname.includes("checkout.html")) {
    loadCartItems();
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
  if (window.location.pathname.includes("checkout.html")) {
    loadCartItems();
  }
}

function updateCartItemQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCounter();
      if (window.location.pathname.includes("checkout.html")) {
        loadCartItems();
      }
    }
  }
}

function updateCartCounter() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  console.log(`Items in cart: ${cartCount}`);
}




