// Catalog: listing, search, details

let currentProduct = null;

function loadFeaturedProducts() {
  const featuredContainer = document.getElementById("featured-products");
  if (!featuredContainer) return;
  const featuredProducts = getProducts().slice(0, 4);
  featuredContainer.innerHTML = featuredProducts
    .map((product) => createProductCard(product, true))
    .join("");
}

function loadAllProducts() {
  const productsContainer = document.getElementById("products-grid");
  if (!productsContainer) return;
  displayProducts(getProducts());
}

function createProductCard(product, isFeatured = false) {
  const oldPriceHtml = product.oldPrice
    ? `<span class="old-price">$${product.oldPrice}</span>`
    : "";
  const stars =
    "★".repeat(Math.floor(product.rating)) +
    "☆".repeat(5 - Math.floor(product.rating));
  return `
    <div class="product-card" onclick="openProductDetail(${product.id})">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">
          <span class="current-price">$${product.price}</span>
          ${oldPriceHtml}
        </div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-text">(${product.rating} out of 5)</span>
        </div>
        <p class="product-description">${product.description}</p>
        <div class="product-sizes"><small>Available sizes: ${product.sizes.join(
          ", "
        )}</small></div>
        ${
          !isFeatured
            ? `<button class="btn btn-primary" onclick="addToCart(${product.id}, 1, 'M')">Add to Cart</button>`
            : ""
        }
      </div>
    </div>`;
}

function displayProducts(productsToShow) {
  const productsContainer = document.getElementById("products-grid");
  if (!productsContainer) return;
  if (productsToShow.length === 0) {
    const noRes = document.getElementById("no-results");
    if (noRes) noRes.style.display = "block";
    productsContainer.innerHTML = "";
    return;
  }
  const noRes = document.getElementById("no-results");
  if (noRes) noRes.style.display = "none";
  productsContainer.innerHTML = productsToShow
    .map((product) => createProductCard(product))
    .join("");
}

function setupSearchAndFilter() {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const priceFilter = document.getElementById("price-filter");
  const sizeFilter = document.getElementById("size-filter");
  if (searchBtn) searchBtn.addEventListener("click", performSearch);
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") performSearch();
    });
  }
  if (priceFilter) priceFilter.addEventListener("change", performSearch);
  if (sizeFilter) sizeFilter.addEventListener("change", performSearch);
}

function performSearch() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const priceFilter = document.getElementById("price-filter").value;
  const sizeFilter = document.getElementById("size-filter").value;

  let filteredProducts = getProducts().filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);

    let matchesPrice = true;
    if (priceFilter) {
      let min = 0,
        max = Infinity;
      if (priceFilter.includes("+")) {
        min = parseInt(priceFilter, 10);
      } else {
        [min, max] = priceFilter.split("-").map((n) => parseInt(n, 10));
      }
      matchesPrice = product.price >= min && product.price <= max;
    }

    let matchesSize = true;
    if (sizeFilter) matchesSize = product.sizes.includes(sizeFilter);
    return matchesSearch && matchesPrice && matchesSize;
  });

  displayProducts(filteredProducts);
}

function openProductDetail(productId) {
  const product = getProducts().find((p) => p.id === productId);
  if (product) {
    localStorage.setItem("currentProduct", JSON.stringify(product));
    window.location.href = "product-detail.html";
  }
}

function loadProductDetail() {
  const product = JSON.parse(localStorage.getItem("currentProduct"));
  if (!product) {
    window.location.href = "products.html";
    return;
  }
  currentProduct = product;

  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-title").textContent = product.name;
  document.getElementById("current-price").textContent = `$${product.price}`;
  document.getElementById("product-description").textContent =
    product.description;
  if (product.oldPrice) {
    document.getElementById("old-price").textContent = `$${product.oldPrice}`;
    document.getElementById("old-price").style.display = "inline";
  }

  document.getElementById("main-product-image").src = product.image;
  document.getElementById("main-product-image").alt = product.name;
  const thumbnailsContainer = document.getElementById("thumbnail-images");
  thumbnailsContainer.innerHTML = product.images
    .map(
      (img) =>
        `<img src="${img}" alt="${product.name}" onclick="changeMainImage('${img}')">`
    )
    .join("");

  const featuresContainer = document.getElementById("product-features");
  featuresContainer.innerHTML = product.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  const stars =
    "★".repeat(Math.floor(product.rating)) +
    "☆".repeat(5 - Math.floor(product.rating));
  document.querySelector(".stars").textContent = stars;
  document.querySelector(
    ".rating-text"
  ).textContent = `(${product.rating} out of 5)`;

  setupSizeSelector();
  setupQuantityControls();
  setupAddToCartButton();
  loadRelatedProducts(product.id);
}

function changeMainImage(imageSrc) {
  document.getElementById("main-product-image").src = imageSrc;
}

function setupSizeSelector() {
  const sizeSelect = document.getElementById("size");
  if (!sizeSelect) return;
  sizeSelect.innerHTML = "";
  currentProduct.sizes.forEach((size) => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    if (size === "M") option.selected = true;
    sizeSelect.appendChild(option);
  });
}

function setupQuantityControls() {
  const decreaseBtn = document.getElementById("decrease-qty");
  const increaseBtn = document.getElementById("increase-qty");
  const quantityInput = document.getElementById("quantity");
  decreaseBtn.addEventListener("click", () => {
    const v = parseInt(quantityInput.value);
    if (v > 1) quantityInput.value = v - 1;
  });
  increaseBtn.addEventListener("click", () => {
    const v = parseInt(quantityInput.value);
    if (v < 99) quantityInput.value = v + 1;
  });
}

function setupAddToCartButton() {
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  addToCartBtn.addEventListener("click", () => {
    const quantity = parseInt(document.getElementById("quantity").value);
    const size = document.getElementById("size").value;
    addToCart(currentProduct.id, quantity, size);
    showNotification("Product added to cart successfully!", "success");
  });
}

function loadRelatedProducts(currentProductId) {
  const relatedContainer = document.getElementById("related-products");
  if (!relatedContainer) return;
  const relatedProducts = getProducts()
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);
  relatedContainer.innerHTML = relatedProducts
    .map((product) => createProductCard(product))
    .join("");
}




