/* ============================================================
   contact.js — منطق صفحة تواصل معنا
   ============================================================ */

function pageInit() {
  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    showToast(currentLang === "ar" ? "✅ تم إرسال رسالتك بنجاح!" : "✅ Message sent successfully!");
    document.getElementById("contact-name").value  = "";
    document.getElementById("contact-email").value = "";
    document.getElementById("contact-msg").value   = "";
  });
}
