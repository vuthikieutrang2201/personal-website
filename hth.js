const sampleProducts = [
  {
    id: '01',
    name: 'Hoodie "Người Im Lặng"',
    price: 1289000,
    image: 'https://image.static.bstage.in/cdn-cgi/image/metadata=none,dpr=2,f=auto,width=620/hieuthuhai/5afbedf8-c17b-4c20-b123-2671d5d1b4ca/9255e8b1-9ac7-4854-b317-6d5b9d70b4f1/ori.jpg'
  },
  {
    id: '02',
    name: 'Hoodie "Người Hay Nói"',
    price: 1289000,
    image: 'https://image.static.bstage.in/cdn-cgi/image/metadata=none,dpr=2,f=auto,width=640/hieuthuhai/58a08267-10fd-438a-8280-ed19e20ea96f/0b0b1be4-a1bf-48ab-ad7a-7312fc7e11a4/ori.jpg'
  },
  {
    id: '03',
    name: 'HIEUTHUHAI OFFICIAL MEMBERSHIP',
    price: 289000,
    image: 'https://image.static.bstage.in/cdn-cgi/image/metadata=none,dpr=2,f=auto,width=170/hieuthuhai/c49bbacb-23bd-42db-95e8-620ec84e5fdf/6f83a908-4d79-42c8-bc3d-086ae4da42d4/ori.jpg'
  },
  {
    id: '04',
    name: 'ALBUM',
    price: 350000,
    image: 'https://image.static.bstage.in/cdn-cgi/image/metadata=none,dpr=2,f=auto,width=640/hieuthuhai/99ff1971-cd3d-4d8f-bc18-5fd3389a29ec/d34f5247-4036-4b0c-beb7-74b7d4a03af2/ori.png'
  }
];

const cartKey = 'hth-cart-v1';
let cart = loadCart();

function loadCart() {
  try {
    const data = localStorage.getItem(cartKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

function saveCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

function renderCart() {
  const container = document.getElementById('cart-container');
  container.innerHTML = '';

  if (!cart.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Giỏ hàng của bạn đang trống.</p>
        <button class="primary-btn" onclick="populateSampleCart()">Thêm sản phẩm mẫu</button>
      </div>
    `;
    return;
  }

  const table = document.createElement('div');
  table.className = 'cart-table';

  const headerRow = document.createElement('div');
  headerRow.className = 'cart-row cart-row--header';
  headerRow.innerHTML = `
    <div>Sản phẩm</div>
    <div>Số lượng</div>
    <div>Đơn giá</div>
    <div>Tạm tính</div>
  `;
  table.appendChild(headerRow);

  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <div class="item-meta">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <strong>${item.name}</strong>
          <button class="link-btn" onclick="removeItem('${item.id}')">Xóa</button>
        </div>
      </div>
      <div class="quantity-controls">
        <button aria-label="Giảm" onclick="updateQuantity('${item.id}', -1)">-</button>
        <span>${item.quantity}</span>
        <button aria-label="Tăng" onclick="updateQuantity('${item.id}', 1)">+</button>
      </div>
      <div>${formatCurrency(item.price)}</div>
      <div>${formatCurrency(item.price * item.quantity)}</div>
    `;
    table.appendChild(row);
  });

  const summary = document.createElement('div');
  summary.className = 'cart-summary';
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  summary.innerHTML = `
    <div class="summary-left">
      <button class="text-btn" onclick="clearCart()">Xóa hết giỏ</button>
    </div>
    <div class="summary-right">
      <div>
        <span>Tổng</span>
        <strong>${formatCurrency(total)}</strong>
      </div>
      <button class="primary-btn" onclick="checkout()">Thanh toán</button>
    </div>
  `;

  container.appendChild(table);
  container.appendChild(summary);
}

function addItem(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  renderCart();
}

function updateQuantity(id, delta) {
  cart = cart.map(item => {
    if (item.id === id) {
      const nextQty = item.quantity + delta;
      return { ...item, quantity: nextQty > 0 ? nextQty : 1 };
    }
    return item;
  });
  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function checkout() {
  alert('Chức năng thanh toán demo. Bạn có ' + cart.length + ' sản phẩm trong giỏ.');
}

function populateSampleCart() {
  sampleProducts.forEach(product => {
    cart.push({ ...product, quantity: 1 });
  });
  saveCart();
  renderCart();
}

renderCart();
