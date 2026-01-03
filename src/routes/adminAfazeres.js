const express = require("express");
const router = express.Router();

const adminAfazerController = require("../controllers/adminAfazerController");

/* =========================
   LISTA
========================= */
router.get("/", adminAfazerController.index);

/* =========================
   CRIAR
========================= */
router.post("/", adminAfazerController.criar);

/* =========================
   EDITAR (FORM)
========================= */
router.get("/:id/editar", adminAfazerController.editar);

/* =========================
   ATUALIZAR
========================= */
router.post("/:id/atualizar", adminAfazerController.atualizar);

/* =========================
   ALTERAR STATUS (AJAX)
========================= */
router.post("/:id/status", adminAfazerController.alterarStatus);

module.exports = router;
