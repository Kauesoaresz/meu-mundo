const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const secaoController = require("../controllers/secaoController");
const postController = require("../controllers/postController");
const comentarioController = require("../controllers/comentarioController");

const simpleAuthController = require("../controllers/simpleAuthController");
const adminSecaoController = require("../controllers/adminSecaoController");
const adminPostController = require("../controllers/adminPostController");
const adminController = require("../controllers/adminController");

const uploadHero = require("../middlewares/uploadHero");
const uploadPostMedia = require("../middlewares/uploadPostMedia");

const auth = require("../middlewares/simpleAuth");

/* ===========================
   LOGIN ADMIN
=========================== */
router.get("/admin/login", (req, res) =>
  simpleAuthController.loginForm(req, res)
);

router.post("/admin/login", (req, res) =>
  simpleAuthController.login(req, res)
);

router.get("/admin/logout", (req, res) =>
  simpleAuthController.logout(req, res)
);

/* ===========================
   ADMIN
=========================== */
// DASHBOARD
router.get("/admin", auth, (req, res) =>
  adminController.dashboard(req, res)
);

// CONFIGURAÇÕES DO MUNDO
router.get("/admin/mundo", auth, (req, res) =>
  adminController.index(req, res)
);

router.post("/admin/mundo", auth, (req, res) =>
  adminController.update(req, res)
);

router.post(
  "/admin/mundo/hero",
  auth,
  uploadHero.single("hero"),
  (req, res) => adminController.atualizarHero(req, res)
);

/* ===========================
   ADMIN - SEÇÕES
=========================== */
router.get("/admin/secoes", auth, (req, res) =>
  adminSecaoController.index(req, res)
);

router.get("/admin/secoes/nova", auth, (req, res) =>
  adminSecaoController.createForm(req, res)
);

router.post("/admin/secoes", auth, (req, res) =>
  adminSecaoController.store(req, res)
);

router.get("/admin/secoes/:id", auth, (req, res) =>
  adminSecaoController.show(req, res)
);

router.get("/admin/secoes/:id/editar", auth, (req, res) =>
  adminSecaoController.editForm(req, res)
);

router.post("/admin/secoes/:id/editar", auth, (req, res) =>
  adminSecaoController.update(req, res)
);

router.post("/admin/secoes/:id/excluir", auth, (req, res) =>
  adminSecaoController.destroy(req, res)
);

/* ===========================
   ADMIN - POSTS
=========================== */
router.get("/admin/posts", auth, (req, res) =>
  adminPostController.index(req, res)
);

router.get("/admin/posts/novo", auth, (req, res) =>
  adminPostController.createForm(req, res)
);

router.post(
  "/admin/posts",
  auth,
  uploadPostMedia.fields([
    { name: "imagem_upload", maxCount: 1 },
    { name: "galeria", maxCount: 20 }
  ]),
  (req, res) => adminPostController.store(req, res)
);

router.get("/admin/posts/:id/editar", auth, (req, res) =>
  adminPostController.editForm(req, res)
);

router.post(
  "/admin/posts/:id/editar",
  auth,
  uploadPostMedia.fields([
    { name: "imagem_upload", maxCount: 1 },
    { name: "galeria", maxCount: 20 }
  ]),
  (req, res) => adminPostController.update(req, res)
);

router.post(
  "/admin/posts/imagem/:id/excluir",
  auth,
  (req, res) => adminPostController.excluirImagem(req, res)
);

router.post("/admin/posts/:id/excluir", auth, (req, res) =>
  adminPostController.destroy(req, res)
);

/* ===========================
   PÚBLICO
=========================== */
// HOME
router.get("/", (req, res) =>
  homeController.index(req, res)
);

// POST (AGORA COM CONTROLLER PRÓPRIO + COMENTÁRIOS)
router.get("/:slug/post/:id", (req, res) =>
  postController.show(req, res)
);

// CRIAR COMENTÁRIO
router.post("/comentarios/:postId", (req, res) =>
  comentarioController.criar(req, res)
);

// SEÇÃO
router.get("/:slug", (req, res) =>
  secaoController.mostrar(req, res)
);

module.exports = router;
