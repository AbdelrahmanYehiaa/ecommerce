// Entry point: page initialization

document.addEventListener("DOMContentLoaded", function () {
  initializeWebsite();
});

function initializeWebsite() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Ensure the default admin exists
  seedAdminUser();

  switch (currentPage) {
    case "index.html":
    case "":
      loadFeaturedProducts();
      setupHeroSlider();
      break;
    case "products.html":
      loadAllProducts();
      setupSearchAndFilter();
      break;
    case "product-detail.html":
      loadProductDetail();
      break;
    case "checkout.html":
      loadCartItems();
      setupCheckoutForm();
      break;
    case "login.html":
      setupLoginForm();
      break;
    case "register.html":
      setupRegisterForm();
      break;
    case "admin.html":
      setupAdminPage();
      break;
    case "logout.html":
      logout();
      break;
  }

  setupNavigation();
}
