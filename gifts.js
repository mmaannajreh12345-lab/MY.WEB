/* ============================================================
   gifts.js — منطق صفحة الهدايا
   ============================================================ */

function pageInit() {
  renderGiftsGrid();
  document.getElementById("modal-close-btn").addEventListener("click", closeSharedModal);
  document.getElementById("product-modal").addEventListener("click", function(e) {
    if (e.target === this) closeSharedModal();
  });
  document.getElementById("modal-buy-btn").addEventListener("click", function() {
    closeSharedModal();
    showToast(currentLang === "ar" ? "✅ تم الإهداء بنجاح!" : "✅ Gift sent successfully!");
  });
}

function onLangChange() { renderGiftsGrid(); }

function renderGiftsGrid() {
  const grid = document.getElementById("gifts-grid");
  grid.innerHTML = PRODUCTS.map((p, i) => `
    <div class="product-card" style="position:relative" onclick="openSharedModal(PRODUCTS[${i}], ${p.gift_price})">
      <span class="gift-ribbon">${currentLang === "ar" ? "هدية" : "Gift"}</span>
      <div class="product-card-img">
        <img src="${p.img}" alt="${p.name_en}" loading="lazy"/>
      </div>
      <div class="product-card-body">
        <div class="product-card-name">${currentLang === "ar" ? p.name_ar : p.name_en}</div>
        <div class="product-card-price">${p.gift_price} ${currentLang === "ar" ? p.currency_ar : p.currency_en}</div>
        <button class="buy-btn" onclick="buyNow(event)">
          ${currentLang === "ar" ? "إهداء" : "Gift Now"}
        </button>
      </div>
    </div>
  `).join("");
}
