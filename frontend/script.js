const API_BASE = 'http://localhost:5000/api';

async function loadCategories() {
  try {
    const res = await axios.get(`${API_BASE}/categories`);
    const select = document.getElementById('categorySelect');

    res.data.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat._id;
      option.textContent = cat.name;
      select.appendChild(option);
    });
  } catch (err) {
    console.error('Failed to load categories:', err);
  }
}

async function loadProducts() {
  const search = document.getElementById('searchInput').value;
  const category = document.getElementById('categorySelect').value;

  let url = `${API_BASE}/products?`;
  if (search) url += `search=${search}&`;
  if (category) url += `category=${category}`;

  try {
    const res = await axios.get(url);
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';

    res.data.forEach(product => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.description || ''}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>${product.discount}%</td>
        <td>$${product.finalPrice.toFixed(2)}</td>
        <td>${product.status}</td>
        <td><code>${product.productCode}</code></td>
      `;

      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error('Failed to load products:', err);
  }
}

// Load everything on page load
window.onload = () => {
  loadCategories();
  loadProducts();
};
