const Equipamento = require("../models/Equipamento");
const Encantamento = require("../models/Encantamento");

exports.index = async (req, res) => {
  try {
    const equipamentos = await Equipamento.findAll({
      include: [
        { model: Encantamento, as: 'obrigatorios', attributes: ['id', 'nome', 'nivel_maximo', 'conquistado'] },
        { model: Encantamento, as: 'opcionais', attributes: ['id', 'nome', 'nivel_maximo', 'conquistado'] }
      ],
      order: [['categoria', 'ASC'], ['ordem', 'ASC']]
    });

    // Calcula o progresso global (apenas dos obrigatórios)
    let totalExigidos = 0;
    let totalConquistados = 0;

    equipamentos.forEach(eq => {
      if (eq.obrigatorios) {
        totalExigidos += eq.obrigatorios.length;
        totalConquistados += eq.obrigatorios.filter(enc => enc.conquistado).length;
      }
    });

    const progressoGlobal = totalExigidos > 0 ? Math.round((totalConquistados / totalExigidos) * 100) : 0;

    res.renderWithLayout("arsenal/index", {
      layout: "layouts/main", // Usa o seu layout padrão público (com o menu que já tem)
      titulo: "Meu Arsenal - God Tier",
      equipamentos,
      equipamentosJSON: JSON.stringify(equipamentos), // Passa como JSON para o JS do mapa mental ler!
      progressoGlobal,
      cssFiles: ["arsenal-publico.css"]
    });

  } catch (erro) {
    console.error("Erro ao carregar o arsenal público:", erro);
    res.status(500).send("Erro interno ao carregar a página.");
  }
};