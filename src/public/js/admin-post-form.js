const rules = {
  diario: ["conteudo", "imagem"],
  galeria: ["imagem", "galeria"],
  exploracao: ["conteudo", "imagem"],
  farm: ["conteudo", "coords", "video"],
  tecnico: ["conteudo", "coords"]
};

const select = document.getElementById("secaoSelect");
const sections = document.querySelectorAll("[data-field]");

function applyRules() {
  const slug = select.options[select.selectedIndex]?.dataset.slug;

  sections.forEach(s => s.style.display = "none");

  if (!rules[slug]) {
    sections.forEach(s => s.style.display = "block");
    return;
  }

  rules[slug].forEach(field => {
    const el = document.querySelector(`[data-field="${field}"]`);
    if (el) el.style.display = "block";
  });
}

select.addEventListener("change", applyRules);
applyRules();
