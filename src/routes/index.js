const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const secaoController = require("../controllers/secaoController");
const simpleAuthController = require("../controllers/simpleAuthController");
const adminSecaoController = require("../controllers/adminSecaoController");
const auth = require("../middlewares/simpleAuth");
const adminPostController = require("../controllers/adminPostController");
const adminController = require("../controllers/adminController");

/* ===========================
   LOGIN ADMIN
=========================== */
router.get("/admin/login", simpleAuthController.loginForm);
router.post("/admin/login", simpleAuthController.login);
router.get("/admin/logout", simpleAuthController.logout);

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

// ADMIN - POSTS
router.get("/admin/posts", auth, adminPostController.index);
router.get("/admin/posts/novo", auth, adminPostController.createForm);
router.post("/admin/posts", auth, adminPostController.store);

router.get("/admin/posts/:id", auth, adminPostController.show);
router.get("/admin/posts/:id/editar", auth, adminPostController.editForm);
router.post("/admin/posts/:id/editar", auth, adminPostController.update);
router.post("/admin/posts/:id/excluir", auth, adminPostController.destroy);

router.get("/admin", auth, adminController.dashboard);

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
