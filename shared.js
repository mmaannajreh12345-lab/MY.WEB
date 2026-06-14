/* ============================================================
   shared.js — بيانات المنتجات + وظائف مشتركة
   ============================================================ */

// =================== PRODUCTS DATA ===================
// الصور: ضع ملفات الصور في مجلد IMAGES بجانب المجلدات
const PRODUCTS = [
  {
    id: 1,
    img: "../صور/oud.jpg",
    name_ar: "العود",
    name_en: "Oud",
    price: 450,
    gift_price: 480,
    currency_ar: "دينار",
    currency_en: "JD",
    features_ar: ["خشب جوز عالي الجودة", "18 وتر مزدوج", "صوت دافئ وعميق", "مناسب للمبتدئين والمحترفين"],
    features_en: ["High-quality walnut wood", "18 double strings", "Warm and deep sound", "Suitable for beginners and pros"]
  },
  {
    id: 2,
    img: "../صور/البيانو.jpg",
    name_ar: "البيانو",
    name_en: "Piano",
    price: 1200,
    gift_price: 1250,
    currency_ar: "دينار",
    currency_en: "JD",
    features_ar: ["88 مفتاح بحجم كامل", "مقاومة وزنية للمفاتيح", "صوت رقمي عالي الدقة", "3 دواسات تعبيرية"],
    features_en: ["88 full-size keys", "Weighted key resistance", "High-fidelity digital sound", "3 expressive pedals"]
  },
  {
    id: 3,
    img: "../صور/الجيتار.jpg",
    name_ar: "الجيتار",
    name_en: "Guitar",
    price: 280,
    gift_price: 300,
    currency_ar: "دينار",
    currency_en: "JD",
    features_ar: ["جسم صوتي خشبي", "6 أوتار فولاذية", "مناسب للموسيقى الكلاسيكية والروك", "يأتي مع حقيبة"],
    features_en: ["Wooden acoustic body", "6 steel strings", "Suitable for classical & rock", "Comes with a bag"]
  },
  {
    id: 4,
    img: "../صور/ادوات الاستوديو.jpg",
    name_ar: "أدوات الاستوديو",
    name_en: "Studio Kit",
    price: 620,
    gift_price: 660,
    currency_ar: "دينار",
    currency_en: "JD",
    features_ar: ["ميكروفون احترافي", "إنترفيس صوتي USB", "سماعات مراقبة", "كابلات وملحقات كاملة"],
    features_en: ["Professional microphone", "USB audio interface", "Monitor headphones", "Full cables & accessories"]
  }
];

const DISCOUNTS = [
  { ...PRODUCTS[0], price: 340, old_price: 450, discount: "25%" },
  { ...PRODUCTS[2], price: 210, old_price: 280, discount: "26%" },
  { ...PRODUCTS[3], price: 470, old_price: 620, discount: "24%" }
];

// =================== STATE ===================
// الوضع الافتراضي: لايت مود (أبيض) — لا نحمّل dark من localStorage إلا إذا المستخدم اختاره سابقاً
let currentLang = localStorage.getItem("lang") || "ar";
let isDark       = localStorage.getItem("dark") === "true";

// =================== INIT ===================
document.addEventListener("DOMContentLoaded", () => {
  applyLang(currentLang, false);
  applyDark(isDark, false);
  highlightNav();
  if (typeof pageInit === "function") pageInit();
});

// =================== NAVBAR HIGHLIGHT ===================
function highlightNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-item").forEach(el => {
    el.classList.toggle("active", el.getAttribute("href").endsWith(page));
  });
}

// =================== DARK MODE ===================
function applyDark(val, save = true) {
  isDark = val;
  document.body.classList.toggle("dark-mode", val);
  const toggle = document.getElementById("dark-toggle");
  if (toggle) toggle.checked = val;
  if (save) localStorage.setItem("dark", val);
}
function toggleDark(cb) { applyDark(cb.checked); }

// =================== LANGUAGE ===================
function applyLang(lang, save = true) {
  currentLang = lang;
  document.querySelectorAll("[data-ar]").forEach(el => {
    if (el.tagName !== "INPUT" && el.tagName !== "TEXTAREA") {
      const val = el.getAttribute("data-" + lang);
      if (val) el.textContent = val;
    }
  });
  document.querySelectorAll("[data-placeholder-ar]").forEach(el => {
    const val = el.getAttribute("data-placeholder-" + lang);
    if (val) el.placeholder = val;
  });
  const btnAr = document.getElementById("btn-ar");
  const btnEn = document.getElementById("btn-en");
  if (btnAr) btnAr.classList.toggle("active", lang === "ar");
  if (btnEn) btnEn.classList.toggle("active", lang === "en");
  if (save) localStorage.setItem("lang", lang);
  if (typeof onLangChange === "function") onLangChange(lang);
}
function setLang(lang) { applyLang(lang); }

// =================== TOAST ===================
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

// =================== BUY ===================
function buyNow(e) {
  if (e) e.stopPropagation();
  showToast(currentLang === "ar" ? "✅ تم الشراء بنجاح!" : "✅ Purchase successful!");
}

// =================== SHARED MODAL ===================
// يُستخدم من store.js و discounts.js و gifts.js
let _currentModalProduct = null;

function openSharedModal(p, extraPrice) {
  _currentModalProduct = p;
  const price = extraPrice !== undefined ? extraPrice : p.price;
  document.getElementById("modal-img").innerHTML =
    `<img src="${p.img}" alt="${currentLang === "ar" ? p.name_ar : p.name_en}"/>`;
  document.getElementById("modal-title").textContent =
    currentLang === "ar" ? p.name_ar : p.name_en;
  document.getElementById("modal-price").textContent =
    `${price} ${currentLang === "ar" ? p.currency_ar : p.currency_en}`;
  const feats = currentLang === "ar" ? p.features_ar : p.features_en;
  document.getElementById("modal-features").innerHTML =
    feats.map(f => `<li>${f}</li>`).join("");
  document.getElementById("modal-buy-btn").textContent =
    currentLang === "ar" ? "شراء" : "Buy";
  document.getElementById("product-modal").classList.add("open");
}

function closeSharedModal() {
  document.getElementById("product-modal").classList.remove("open");
  _currentModalProduct = null;
}
