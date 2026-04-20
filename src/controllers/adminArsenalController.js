const fs = require('fs');
const path = require('path');



const Equipamento = require("../models/Equipamento");
const Encantamento = require("../models/Encantamento");

exports.index = async (req, res) => {
  try {
    // Busca equipamentos com as DUAS listas de encantamentos
    const equipamentos = await Equipamento.findAll({
      include: [
        { model: Encantamento, as: 'obrigatorios', attributes: ['id', 'nome', 'nivel_maximo'] },
        { model: Encantamento, as: 'opcionais', attributes: ['id', 'nome', 'nivel_maximo'] }
      ],
      order: [['categoria', 'ASC'], ['ordem', 'ASC']]
    });

    const todosEncantamentos = await Encantamento.findAll({
      order: [['categoria', 'ASC'], ['nome', 'ASC']]
    });

    res.renderWithLayout("admin/arsenal/index", {
      layout: "layouts/admin",
      titulo: "Arsenal God-Tier",
      equipamentos,
      todosEncantamentos,
      cssFiles: ["admin-arsenal.css"]
    });

  } catch (erro) {
    console.error("Erro ao carregar o arsenal:", erro);
    res.status(500).send("Erro interno ao carregar a página de Arsenal.");
  }
};

// 🔥 ADICIONADO: Carrega a tela de edição com os dados preenchidos
exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const equipamento = await Equipamento.findByPk(id, {
      include: [
        { model: Encantamento, as: 'obrigatorios' },
        { model: Encantamento, as: 'opcionais' }
      ]
    });

    if (!equipamento) return res.redirect('/admin/arsenal');

    const todosEncantamentos = await Encantamento.findAll({
      order: [['categoria', 'ASC'], ['nome', 'ASC']]
    });

    res.renderWithLayout("admin/arsenal/editar", {
      layout: "layouts/admin",
      titulo: `Editar - ${equipamento.nome}`,
      equipamento,
      todosEncantamentos,
      cssFiles: ["admin-arsenal.css"]
    });

  } catch (erro) {
    console.error("Erro ao carregar edição:", erro);
    res.status(500).send("Erro ao carregar a página de edição.");
  }
};

// 🔥 ADICIONADO: Salva as alterações no banco
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, categoria, ordem, encantamentos_obrigatorios, encantamentos_opcionais } = req.body;
    
    const equipamento = await Equipamento.findByPk(id);
    if (!equipamento) return res.redirect('/admin/arsenal');

    let imagemCaminho = equipamento.imagem;

    // Se o usuário subiu uma imagem nova, apaga a velha e salva a nova
    if (req.file) {
      if (equipamento.imagem) {
        const imagePath = path.join(__dirname, "../public", equipamento.imagem);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      imagemCaminho = `/img/uploads/${req.file.filename}`;
    }

    // Atualiza os dados básicos
    await equipamento.update({
      nome,
      categoria,
      ordem: ordem || 0,
      imagem: imagemCaminho
    });

    // Atualiza Obrigatórios (se não vier nada do form, envia array vazio para limpar)
    const idsObrig = encantamentos_obrigatorios 
      ? (Array.isArray(encantamentos_obrigatorios) ? encantamentos_obrigatorios : [encantamentos_obrigatorios]) 
      : [];
    await equipamento.setObrigatorios(idsObrig);

    // Atualiza Opcionais
    const idsOpcionais = encantamentos_opcionais 
      ? (Array.isArray(encantamentos_opcionais) ? encantamentos_opcionais : [encantamentos_opcionais]) 
      : [];
    await equipamento.setOpcionais(idsOpcionais);

    res.redirect("/admin/arsenal");

  } catch (erro) {
    console.error("Erro ao atualizar equipamento:", erro);
    res.status(500).send("Erro ao atualizar o equipamento.");
  }
};

exports.deletar = async (req, res) => {
  try {
    const id = req.params.id;
    const equipamento = await Equipamento.findByPk(id);

    if (equipamento) {
      // 1. Apaga a imagem da pasta uploads (se existir)
      if (equipamento.imagem) {
        const imagePath = path.join(__dirname, "../../public", equipamento.imagem);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      
      // 2. Deleta do banco de dados (o Sequelize já limpa as ligações com as tags automaticamente)
      await equipamento.destroy();
    }

    res.redirect("/admin/arsenal");

  } catch (erro) {
    console.error("Erro ao deletar equipamento:", erro);
    res.status(500).send("Erro ao deletar o equipamento.");
  }
};

exports.store = async (req, res) => {
  try {
    const { nome, categoria, ordem, encantamentos_obrigatorios, encantamentos_opcionais } = req.body;
    let imagemCaminho = null;

    if (req.file) {
      imagemCaminho = `/img/uploads/${req.file.filename}`;
    }

    const novoEquipamento = await Equipamento.create({
      nome,
      categoria,
      ordem: ordem || 0,
      imagem: imagemCaminho
    });

    // Salva os Obrigatórios
    if (encantamentos_obrigatorios) {
      const idsObrig = Array.isArray(encantamentos_obrigatorios) ? encantamentos_obrigatorios : [encantamentos_obrigatorios];
      await novoEquipamento.setObrigatorios(idsObrig);
    }

    // Salva os Opcionais
    if (encantamentos_opcionais) {
      const idsOpcionais = Array.isArray(encantamentos_opcionais) ? encantamentos_opcionais : [encantamentos_opcionais];
      await novoEquipamento.setOpcionais(idsOpcionais);
    }

    res.redirect("/admin/arsenal");

  } catch (erro) {
    console.error("Erro ao salvar equipamento:", erro);
    res.status(500).send("Erro ao salvar o equipamento.");
  }
};

