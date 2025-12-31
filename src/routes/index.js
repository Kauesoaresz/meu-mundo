const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const secaoController = require("../controllers/secaoController");
const simpleAuthController = require("../controllers/simpleAuthController");
const adminSecaoController = require("../controllers/adminSecaoController");
const adminPostController = require("../controllers/adminPostController");
const adminController = require("../controllers/adminController");

const uploadHero = require("../middlewares/uploadHero");

const auth = require("../middlewares/simpleAuth");

/* ===========================
   LOGIN ADMIN
=========================== */
router.get("/admin/login", simpleAuthController.loginForm);
router.post("/admin/login", simpleAuthController.login);
router.get("/admin/logout", simpleAuthController.logout);

/* ===========================
   ADMIN - MUNDO
=========================== */
router.get("/admin", auth, adminController.index);

// ✅ ROTA QUE ESTAVA FALTANDO
router.post("/admin/mundo", auth, adminController.update);

router.post(
  "/admin/mundo/hero",
  auth,
  uploadHero.single("hero"),
  adminController.atualizarHero
);

/* ===========================
   ADMIN - SEÇÕES
=========================== */
router.get("/admin/secoes", auth, adminSecaoController.index);
router.get("/admin/secoes/nova", auth, adminSecaoController.createForm);
router.post("/admin/secoes", auth, adminSecaoController.store);

router.get("/admin/secoes/:id", auth, adminSecaoController.show);
router.get("/admin/secoes/:id/editar", auth, adminSecaoController.editForm);
router.post("/admin/secoes/:id/editar", auth, adminSecaoController.update);
router.post("/admin/secoes/:id/excluir", auth, adminSecaoController.destroy);

/* ===========================
   ADMIN - POSTS
=========================== */
router.get("/admin/posts", auth, adminPostController.index);
router.get("/admin/posts/novo", auth, adminPostController.createForm);
router.post("/admin/posts", auth, adminPostController.store);

router.get("/admin/posts/:id", auth, adminPostController.show);
router.get("/admin/posts/:id/editar", auth, adminPostController.editForm);
router.post("/admin/posts/:id/editar", auth, adminPostController.update);
router.post("/admin/posts/:id/excluir", auth, adminPostController.destroy);

/* ===========================
   PÚBLICO
=========================== */
router.get("/", homeController.index);
router.get("/:slug/post/:id", secaoController.mostrarPost);

/* ===========================
   ROTA DINÂMICA (SEMPRE POR ÚLTIMO)
=========================== */
router.get("/:slug", secaoController.mostrar);

module.exports = router;
