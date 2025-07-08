const productList = document.getElementById("product-list");
const cartCountElement = document.getElementById("cart-count");
let cartCount = 0;

fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product");
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart()">Add to Cart</button>
      `;
      productList.appendChild(productCard);
    });
  });

function addToCart() {
  cartCount++;
  cartCountElement.textContent = cartCount;
}
