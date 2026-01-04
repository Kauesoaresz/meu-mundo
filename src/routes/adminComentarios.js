const express = require("express");
const router = express.Router();

const adminComentariosController = require("../controllers/adminComentariosController");
const auth = require("../middlewares/simpleAuth");

router.get("/", auth, (req, res) =>
  adminComentariosController.index(req, res)
);

router.post("/:id/aprovar", auth, (req, res) =>
  adminComentariosController.aprovar(req, res)
);

router.post("/:id/reprovar", auth, (req, res) =>
  adminComentariosController.reprovar(req, res)
);

router.post("/:id/excluir", auth, (req, res) =>
  adminComentariosController.excluir(req, res)
);

module.exports = router;
