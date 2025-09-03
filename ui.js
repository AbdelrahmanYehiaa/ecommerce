// UI utilities: notifications and hero slider

// Show notification toast
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

  switch (type) {
    case "success":
      notification.style.backgroundColor = "#27ae60";
      break;
    case "error":
      notification.style.backgroundColor = "#e74c3c";
      break;
    case "info":
      notification.style.backgroundColor = "#3498db";
      break;
    default:
      notification.style.backgroundColor = "#95a5a6";
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add keyframes for notifications once
(() => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to   { transform: translateX(0);   opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0);   opacity: 1; }
      to   { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

// Simple hero background slider on Home 

function setupHeroSlider() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const images = ["/black.jpeg", "/hoodie.jpeg", "/jacket-white.jpg"];
  let index = 0;
  setInterval(() => {
    index = (index + 1) % images.length;
    hero.style.backgroundImage = `url('${images[index]}')`;
  }, 3000);
}




