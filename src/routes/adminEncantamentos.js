const express = require("express");
const router = express.Router();
const adminEncantamentosController = require("../controllers/adminEncantamentosController");

// Se você tiver um middleware de autenticação, descomente a linha abaixo:
// const simpleAuth = require("../middlewares/simpleAuth");
// router.use(simpleAuth);

// Tela principal
router.get("/", adminEncantamentosController.index);

// Criar
router.post("/add", adminEncantamentosController.store);

// Marcar como Conquistado/Não Conquistado
router.post("/toggle/:id", adminEncantamentosController.toggleConquistado);

// Deletar
router.post("/delete/:id", adminEncantamentosController.destroy);

module.exports = router;