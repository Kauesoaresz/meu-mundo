document.addEventListener("DOMContentLoaded", () => {
  const lista = document.querySelector(".admin-afazeres-list");

  function atualizarTextoStatus(status) {
    if (status === "concluido") return "Concluído";
    if (status === "em_obra") return "Em obra";
    return "Não iniciado";
  }

  function moverItem(item, status) {
    if (status === "concluido") {
      // move para o final
      lista.appendChild(item);
    } else {
      // move para o topo (antes do primeiro concluído)
      const concluidos = lista.querySelectorAll(".admin-afazer-item.concluido");
      if (concluidos.length > 0) {
        lista.insertBefore(item, concluidos[0]);
      } else {
        lista.prepend(item);
      }
    }
  }

  document.querySelectorAll(".status-select").forEach(select => {
    select.addEventListener("change", async () => {
      const afazerId = select.dataset.id;
      const novoStatus = select.value;
      const item = select.closest(".admin-afazer-item");

      try {
        const res = await fetch(`/admin/afazeres/${afazerId}/status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: novoStatus })
        });

        const data = await res.json();
        if (!data.success) {
          alert("Erro ao alterar status");
          return;
        }

        // visual
        item.classList.toggle("concluido", novoStatus === "concluido");

        const statusLabel = item.querySelector(".admin-afazer-status");
        statusLabel.className = `admin-afazer-status ${novoStatus}`;
        statusLabel.innerText = atualizarTextoStatus(novoStatus);

        // 🔥 mover posição
        moverItem(item, novoStatus);

      } catch (err) {
        console.error(err);
        alert("Erro de comunicação");
      }
    });
  });
});
