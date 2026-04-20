const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // 🔥 ADICIONADO: Módulo nativo de arquivos do Node
const adminArsenalController = require("../controllers/adminArsenalController");

// 🔥 ADICIONADO: Verifica se a pasta existe. Se não existir, cria!
const uploadDir = path.join(__dirname, "../public/img/uploads/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'arsenal-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Rotas
router.get("/", adminArsenalController.index);
router.post("/adicionar", upload.single("imagem"), adminArsenalController.store);

// 🔥 ADICIONADO: Rotas de Edição
router.get("/editar/:id", adminArsenalController.edit);
router.post("/editar/:id", upload.single("imagem"), adminArsenalController.update);

router.post("/deletar/:id", adminArsenalController.deletar);

module.exports = router;