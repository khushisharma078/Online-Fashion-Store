const messages = document.getElementById('messages');
const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');

function showMessage(msg, type = 'info') {
  messages.textContent = msg;
  messages.style.color = type === 'error' ? 'red' : 'green';
}

function clearMessage() {
  messages.textContent = '';
}

function renderProducts(products) {
  productList.innerHTML = '';
  if (products.length === 0) {
    productList.innerHTML = '<p>No products found.</p>';
    return;
  }
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p>${product.description}</p>
    `;
    productList.appendChild(productDiv);
  });
}

function fetchProducts() {
  showMessage('Loading products...');
  fetch('http://localhost:5000/api/products')
    .then(res => res.json())
    .then(products => {
      clearMessage();
      renderProducts(products);
    })
    .catch(() => {
      showMessage('Failed to load products. Is the backend running?', 'error');
      productList.innerHTML = '';
    });
}

productForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const newProduct = {
    name: document.getElementById('name').value,
    price: document.getElementById('price').value,
    image: document.getElementById('image').value,
    description: document.getElementById('description').value
  };
  showMessage('Adding product...');
  fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  })
    .then(res => res.json())
    .then(product => {
      showMessage('Product added!');
      productForm.reset();
      fetchProducts();
    })
    .catch(() => {
      showMessage('Failed to add product.', 'error');
    });
});

fetchProducts();