// T-Shirts Data
const products = [
  {
    id: 1,
    name: "Black T-Shirt",
    price: 500,
    oldPrice: 850,
    description: "Premium cotton classic black t-shirt with a comfortable fit",
    image:
      "C:UsersAbd ElrahmanDownloadsWhatsApp Image 2025-08-21 at 12.46.28 PM.jpeg",
    images: [
      "https://via.placeholder.com/300x300/000000/ffffff?text=Black+T-Shirt+1",
      "https://via.placeholder.com/300x300/000000/ffffff?text=Black+T-Shirt+2",
      "https://via.placeholder.com/300x300/000000/ffffff?text=Black+T-Shirt+3",
    ],
    category: "Basic",
    rating: 4.8,
    features: [
      "100% Premium Cotton",
      "Comfortable fit",
      "Available in all sizes",
      "Machine washable",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
  {
    id: 2,
    name: "grey hoodie",
    price: 800,
    oldPrice: 1000,
    description: "Cool hoodie",
    image: "/hoodie.jpeg",
    images: [
      "https://via.placeholder.com/300x300/8B0000/ffffff?text=Rock+T-Shirt+1",
      "https://via.placeholder.com/300x300/8B0000/ffffff?text=Rock+T-Shirt+2",
    ],
    category: "Graphic",
    rating: 4.9,
    features: [
      "street wear design",
      "Soft cotton blend",
      "Unique design",
      "Comfortable fit",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
  {
    id: 3,
    name: "White jacket",
    price: 800,
    oldPrice: null,
    description: "Clean and simple white jacket perfect for everyday wear",
    image: "/jacket-white.jpg",
    images: [
      "https://via.placeholder.com/300x300/FFFFFF/000000?text=White+T-Shirt+1",
    ],
    category: "Basic",
    rating: 4.6,
    features: [
      "Pure white cotton",
      "Minimalist design",
      "styling",
      "Breathable fabric",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: 4,
    name: "black jacket",
    price: 10,
    oldPrice: 500,
    description: "jacket",
    image: "bondq.jpg",
    images: [
      "https://via.placeholder.com/300x300/4B0082/ffffff?text=Gaming+T-Shirt+1",
      "https://via.placeholder.com/300x300/4B0082/ffffff?text=Gaming+T-Shirt+2",
    ],
    category: "Gaming",
    rating: 4.7,
    features: ["good", "t2il", "gamed", "Stylish"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
  {
    id: 5,
    name: "Summer Beach T-Shirt",
    price: 27.99,
    oldPrice: null,
    description: "Lightweight summer t-shirt perfect for beach days",
    image:
      "https://via.placeholder.com/300x300/00CED1/ffffff?text=Beach+T-Shirt",
    images: [
      "https://via.placeholder.com/300x300/00CED1/ffffff?text=Beach+T-Shirt+1",
      "https://via.placeholder.com/300x300/00CED1/ffffff?text=Beach+T-Shirt+2",
    ],
    category: "Summer",
    rating: 4.9,
    features: [
      "Lightweight fabric",
      "Beach themed design",
      "Quick dry material",
      "UV protection",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: 6,
    name: "Sports Team T-Shirt",
    price: 32.99,
    oldPrice: 37.99,
    description: "Show your team spirit with this sports team t-shirt",
    image:
      "https://via.placeholder.com/300x300/FF4500/ffffff?text=Sports+T-Shirt",
    images: [
      "https://via.placeholder.com/300x300/FF4500/ffffff?text=Sports+T-Shirt+1",
    ],
    category: "Sports",
    rating: 4.5,
    features: [
      "Team logo design",
      "Moisture wicking",
      "Comfortable fit",
      "Durable material",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
  {
    id: 7,
    name: "Artistic Design T-Shirt",
    price: 39.99,
    oldPrice: null,
    description: "Unique artistic design t-shirt for creative individuals",
    image:
      "https://via.placeholder.com/300x300/FF69B4/ffffff?text=Artistic+T-Shirt",
    images: [
      "https://via.placeholder.com/300x300/FF69B4/ffffff?text=Artistic+T-Shirt+1",
    ],
    category: "Artistic",
    rating: 4.4,
    features: [
      "Unique artwork",
      "Premium cotton",
      "Limited edition",
      "Artist collaboration",
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: 8,
    name: "Comfort Fit T-Shirt",
    price: 22.99,
    oldPrice: 26.99,
    description: "Ultra-comfortable t-shirt with relaxed fit",
    image:
      "https://via.placeholder.com/300x300/32CD32/ffffff?text=Comfort+T-Shirt",
    images: [
      "https://via.placeholder.com/300x300/32CD32/ffffff?text=Comfort+T-Shirt+1",
      "https://via.placeholder.com/300x300/32CD32/ffffff?text=Comfort+T-Shirt+2",
    ],
    category: "Comfort",
    rating: 4.6,
    features: [
      "Relaxed fit",
      "Soft cotton blend",
      "Tagless design",
      "All-day comfort",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
];

// Export data
if (typeof module !== "undefined" && module.exports) {
  module.exports = { products };
}
