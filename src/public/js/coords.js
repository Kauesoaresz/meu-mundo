document.addEventListener("click", (e) => {
  const btn = e.target.closest(".copy-coords");
  if (!btn) return;

  const container = btn.closest(".post-coords");
  const text = container.dataset.coords;

  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add("copied");
    btn.textContent = "✔ Copiado";

    setTimeout(() => {
      btn.classList.remove("copied");
      btn.textContent = "📋 Copiar";
    }, 1500);
  });
});
