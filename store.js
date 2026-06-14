/* ============================================================
   store.js — منطق صفحة المتجر والمودال
   ============================================================ */

function pageInit() {
  renderGrid();
  document.getElementById("modal-close-btn").addEventListener("click", closeSharedModal);
  document.getElementById("product-modal").addEventListener("click", function(e) {
    if (e.target === this) closeSharedModal();
  });
  document.getElementById("modal-buy-btn").addEventListener("click", function() {
    closeSharedModal();
    showToast(currentLang === "ar" ? "✅ تم الشراء بنجاح!" : "✅ Purchase successful!");
  });
}

function onLangChange() {
  renderGrid();
  if (_currentModalProduct) openSharedModal(_currentModalProduct);
}

function renderGrid() {
  const grid = document.getElementById("store-grid");
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card" onclick="openSharedModal(PRODUCTS.find(x=>x.id===${p.id}))">
      <div class="product-card-img">
        <img src="${p.img}" alt="${p.name_en}" loading="lazy"/>
      </div>
      <div class="product-card-body">
        <div class="product-card-name">${currentLang === "ar" ? p.name_ar : p.name_en}</div>
        <div class="product-card-price">${p.price} ${currentLang === "ar" ? p.currency_ar : p.currency_en}</div>
        <button class="buy-btn" onclick="buyNow(event)">
          ${currentLang === "ar" ? "شراء" : "Buy"}
        </button>
      </div>
    </div>
  `).join("");
}
