const Encantamento = require("../models/Encantamento");

const adminEncantamentosController = {
  // Renderiza a tela principal com as 3 colunas
  index: async (req, res) => {
    try {
      const todosEncantamentos = await Encantamento.findAll({
        order: [
          ["prioridade", "DESC"], // Alta prioridade primeiro
          ["nome", "ASC"]
        ]
      });

      // Separando as categorias para o Frontend (EJS)
      const armadura = todosEncantamentos.filter(e => e.categoria === "Armadura");
      const ferramentas = todosEncantamentos.filter(e => e.categoria === "Ferramentas");
      const armas = todosEncantamentos.filter(e => e.categoria === "Armas");

      res.renderWithLayout("admin/encantamentos/index", {
        layout: "layouts/admin",
        titulo: "Gerenciar Encantamentos",
        armadura,
        ferramentas,
        armas
      });
    } catch (erro) {
      console.error("Erro ao carregar encantamentos:", erro);
      res.status(500).send("Erro interno ao carregar a página.");
    }
  },

  // Adiciona um novo encantamento
  store: async (req, res) => {
    try {
      const { nome, categoria, nivel_maximo, prioridade } = req.body;
      await Encantamento.create({
        nome,
        categoria,
        nivel_maximo: parseInt(nivel_maximo) || 1,
        prioridade: prioridade || 'media',
        conquistado: false
      });
      res.redirect("/admin/encantamentos");
    } catch (erro) {
      console.error("Erro ao salvar encantamento:", erro);
      res.status(500).send("Erro ao salvar.");
    }
  },

  // Alterna o status de conquistado (Verde / Vermelho)
  toggleConquistado: async (req, res) => {
    try {
      const { id } = req.params;
      const encantamento = await Encantamento.findByPk(id);
      
      if (encantamento) {
        encantamento.conquistado = !encantamento.conquistado;
        await encantamento.save();
      }
      res.redirect("/admin/encantamentos");
    } catch (erro) {
      console.error("Erro ao atualizar status:", erro);
      res.status(500).send("Erro ao atualizar.");
    }
  },

  // Deleta um encantamento
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      await Encantamento.destroy({ where: { id } });
      res.redirect("/admin/encantamentos");
    } catch (erro) {
      console.error("Erro ao deletar:", erro);
      res.status(500).send("Erro ao deletar.");
    }
  }
};

module.exports = adminEncantamentosController;