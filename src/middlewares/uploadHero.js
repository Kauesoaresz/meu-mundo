const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Importamos o File System para criar a pasta

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Aponta para o caminho absoluto correto, subindo uma pasta (../) de middlewares para src/
    const dir = path.join(__dirname, "../public/img/hero/uploads");
    
    // Se a pasta não existir, o Node cria ela na hora (recursive: true cria subpastas se precisar)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `hero-${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Arquivo inválido. Envie apenas imagens."), false);
  }
};

module.exports = multer({ storage, fileFilter });