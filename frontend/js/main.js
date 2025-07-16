fetch('http://localhost:5000/api/products')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('products');
    data.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart('${product._id}')">Add to Cart</button>
      `;
      container.appendChild(div);
    });
  });

function addToCart(productId) {
  alert('Added product ' + productId + ' to cart');
}
