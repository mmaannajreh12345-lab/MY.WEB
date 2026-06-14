/* ============================================================
   discounts.js — منطق صفحة الخصومات
   ============================================================ */

function pageInit() {
  renderDiscountsGrid();
  document.getElementById("modal-close-btn").addEventListener("click", closeSharedModal);
  document.getElementById("product-modal").addEventListener("click", function(e) {
    if (e.target === this) closeSharedModal();
  });
  document.getElementById("modal-buy-btn").addEventListener("click", function() {
    closeSharedModal();
    showToast(currentLang === "ar" ? "✅ تم الشراء بنجاح!" : "✅ Purchase successful!");
  });
}

function onLangChange() { renderDiscountsGrid(); }

function renderDiscountsGrid() {
  const grid = document.getElementById("discounts-grid");
  grid.innerHTML = DISCOUNTS.map((p, i) => `
    <div class="product-card" onclick="openSharedModal(DISCOUNTS[${i}], ${p.price})">
      <div class="product-card-img">
        <img src="${p.img}" alt="${p.name_en}" loading="lazy"/>
      </div>
      <div class="product-card-body">
        <div class="discount-badge">-${p.discount}</div>
        <div class="product-card-name">${currentLang === "ar" ? p.name_ar : p.name_en}</div>
        <div class="product-card-price">
          <span class="product-card-old-price">${p.old_price} ${currentLang === "ar" ? p.currency_ar : p.currency_en}</span>
          ${p.price} ${currentLang === "ar" ? p.currency_ar : p.currency_en}
        </div>
        <button class="buy-btn" onclick="buyNow(event)">
          ${currentLang === "ar" ? "شراء" : "Buy"}
        </button>
      </div>
    </div>
  `).join("");
}
