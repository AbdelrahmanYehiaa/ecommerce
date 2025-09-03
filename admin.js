// Product storage helpers and Admin page logic

function getProducts() {
  const stored = JSON.parse(localStorage.getItem("productsData"));
  return Array.isArray(stored) && stored.length > 0 ? stored : products;
}

function setProducts(newProducts) {
  localStorage.setItem("productsData", JSON.stringify(newProducts));
}

function setupAdminPage() {
  const user = getCurrentUser();
  if (!user || !user.isAdmin) {
    showNotification("Admin access required", "error");
    setTimeout(() => (window.location.href = "login.html"), 800);
    return;
  }

  const form = document.getElementById("admin-product-form");
  const listContainer = document.getElementById("admin-products-list");
  if (!form || !listContainer) return;

  renderAdminProductsList();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const idEditing = form.getAttribute("data-edit-id");
    const name = document.getElementById("admin-name").value.trim();
    const price = parseFloat(document.getElementById("admin-price").value);
    const image = document.getElementById("admin-image").value.trim();
    const description = document
      .getElementById("admin-description")
      .value.trim();
    const sizesRaw = document.getElementById("admin-sizes").value.trim();
    const sizes = sizesRaw ? sizesRaw.split(",").map((s) => s.trim()) : ["M"];

    if (!name || isNaN(price) || !image) {
      showNotification("Please fill name, price and image URL", "error");
      return;
    }

    const all = [...getProducts()];
    if (idEditing) {
      const idx = all.findIndex((p) => String(p.id) === String(idEditing));
      if (idx !== -1) {
        all[idx] = {
          ...all[idx],
          name,
          price,
          image,
          description,
          sizes,
        };
      }
    } else {
      const nextId = all.length ? Math.max(...all.map((p) => p.id)) + 1 : 1;
      all.push({
        id: nextId,
        name,
        price,
        oldPrice: null,
        description,
        image,
        images: [image],
        category: "Custom",
        rating: 4.5,
        features: ["Custom item"],
        sizes,
        inStock: true,
      });
    }

    setProducts(all);
    form.removeAttribute("data-edit-id");
    form.reset();
    renderAdminProductsList();
    showNotification("Product saved", "success");
  });
}

function renderAdminProductsList() {
  const listContainer = document.getElementById("admin-products-list");
  if (!listContainer) return;
  const all = getProducts();
  if (all.length === 0) {
    listContainer.innerHTML = "<p>No products yet</p>";
    return;
  }

  listContainer.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr><th>ID</th><th>Name</th><th>Price</th><th>Actions</th></tr>
      </thead>
      <tbody>
        ${all
          .map(
            (p) => `
            <tr>
              <td>${p.id}</td>
              <td>${p.name}</td>
              <td>$${p.price}</td>
              <td>
                <button class="btn btn-secondary" data-edit="${p.id}">Edit</button>
                <button class="btn btn-primary" data-delete="${p.id}">Delete</button>
              </td>
            </tr>`
          )
          .join("")}
      </tbody>
    </table>`;

  listContainer.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-edit");
      const product = getProducts().find((p) => String(p.id) === String(id));
      if (!product) return;
      const form = document.getElementById("admin-product-form");
      document.getElementById("admin-name").value = product.name;
      document.getElementById("admin-price").value = product.price;
      document.getElementById("admin-image").value = product.image;
      document.getElementById("admin-description").value =
        product.description || "";
      document.getElementById("admin-sizes").value = (product.sizes || []).join(
        ", "
      );
      form.setAttribute("data-edit-id", String(product.id));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  listContainer.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-delete"));
      const remaining = getProducts().filter((p) => p.id !== id);
      setProducts(remaining);
      renderAdminProductsList();
      showNotification("Product deleted", "info");
    });
  });
}




