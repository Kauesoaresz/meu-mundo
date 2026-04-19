const Encantamento = require("../models/Encantamento");

const encantamentosController = {
  index: async (req, res) => {
    try {
      const todosEncantamentos = await Encantamento.findAll({
        order: [
          ["categoria", "ASC"],
          ["nome", "ASC"]
        ]
      });

      // Separando por categorias para facilitar na View
      const armadura = todosEncantamentos.filter(e => e.categoria === "Armadura");
      const ferramentas = todosEncantamentos.filter(e => e.categoria === "Ferramentas");
      const armas = todosEncantamentos.filter(e => e.categoria === "Armas");

      // Calculando o progresso para uma barra de XP
      const total = todosEncantamentos.length;
      const conquistados = todosEncantamentos.filter(e => e.conquistado).length;
      const porcentagem = total === 0 ? 0 : Math.round((conquistados / total) * 100);

      res.renderWithLayout("site/encantamentos", {
        layout: "layouts/main", // Usando o seu layout público
        titulo: "Grimório de Encantamentos | Meu Mundo",
        armadura,
        ferramentas,
        armas,
        progresso: porcentagem
      });
    } catch (erro) {
      console.error("Erro ao carregar grimório:", erro);
      res.status(500).send("Erro interno ao carregar a página.");
    }
  }
};

module.exports = encantamentosController;