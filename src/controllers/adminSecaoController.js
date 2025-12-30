const Secao = require("../models/Secao");

// LISTAR
exports.index = async (req, res) => {
  const secoes = await Secao.findAll({ order: [["ordem", "ASC"]] });

  res.renderWithLayout("admin/secoes/index", {
    layout: "layouts/admin",
    titulo: "Gerenciar Seções",
    secoes
  });
};

// FORM NOVA
exports.createForm = (req, res) => {
  res.renderWithLayout("admin/secoes/form", {
    layout: "layouts/admin",
    titulo: "Nova Seção",
    secao: null
  });
};

// CRIAR
exports.store = async (req, res) => {
  const { nome, slug, icone, ordem, ativa } = req.body;

  await Secao.create({
    nome,
    slug,
    icone,
    ordem,
    ativa: ativa ? true : false
  });

  res.redirect("/admin/secoes");
};

// VER
exports.show = async (req, res) => {
  const secao = await Secao.findByPk(req.params.id);
  if (!secao) return res.send("Seção não encontrada");

  res.renderWithLayout("admin/secoes/show", {
    layout: "layouts/admin",
    titulo: `Seção: ${secao.nome}`,
    secao
  });
};

// FORM EDITAR
exports.editForm = async (req, res) => {
  const secao = await Secao.findByPk(req.params.id);
  if (!secao) return res.send("Seção não encontrada");

  res.renderWithLayout("admin/secoes/form", {
    layout: "layouts/admin",
    titulo: "Editar Seção",
    secao
  });
};

// ATUALIZAR
exports.update = async (req, res) => {
  const { nome, slug, icone, ordem, ativa } = req.body;

  await Secao.update(
    {
      nome,
      slug,
      icone,
      ordem,
      ativa: ativa ? true : false
    },
    { where: { id: req.params.id } }
  );

  res.redirect("/admin/secoes");
};

// EXCLUIR
exports.destroy = async (req, res) => {
  await Secao.destroy({ where: { id: req.params.id } });
  res.redirect("/admin/secoes");
};
