const Afazer = require("../models/Afazer");

/* =========================
   LISTAR AFAZERES (ADMIN)
========================= */
exports.index = async (req, res) => {
  try {
    const afazeres = await Afazer.findAll({
      order: [
        ["status", "ASC"],     // não iniciado → em obra → concluído
        ["ordem", "ASC"],
        ["criado_em", "ASC"]
      ]
    });

    const total = afazeres.length;
    const concluidos = afazeres.filter(a => a.status === "concluido").length;

    res.render("layouts/admin", {
  titulo: "Afazeres",
  body: await new Promise((resolve, reject) => {
    res.render("admin/afazeres/index", {
      afazeres,
      total,
      concluidos
    }, (err, html) => {
      if (err) reject(err);
      else resolve(html);
    });
  })
});


  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar afazeres");
  }
};

/* =========================
   CRIAR AFAZER
========================= */
exports.criar = async (req, res) => {
  try {
    const { titulo, descricao, prioridade } = req.body;

    await Afazer.create({
      titulo,
      descricao,
      prioridade
    });

    res.redirect("/admin/afazeres");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar afazer");
  }
};

/* =========================
   ALTERAR STATUS
========================= */
exports.alterarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const afazer = await Afazer.findByPk(id);
    if (!afazer) {
      return res.status(404).json({ error: "Afazer não encontrado" });
    }

    afazer.status = status;

    if (status === "concluido") {
      afazer.concluido_em = new Date();
    } else {
      afazer.concluido_em = null;
    }

    await afazer.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao alterar status" });
  }
};
