const Comentario = require("../models/Comentario");

exports.criar = async (req, res) => {
  try {
    const { nome, comentario } = req.body;
    const { postId } = req.params;

    if (!nome || !comentario) {
      return res.redirect("back");
    }

    await Comentario.create({
      post_id: postId,
      nome,
      comentario
    });

    res.redirect("back");
  } catch (err) {
    console.error("Erro ao criar comentário:", err);
    res.redirect("back");
  }
};
