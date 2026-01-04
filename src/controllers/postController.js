const { Post, Secao, PostImagem, Comentario } = require("../config/database").models;

/* ===============================
   POST PÚBLICO
=============================== */
exports.show = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        Secao,
        { model: PostImagem, as: "imagens" }
      ]
    });

    if (!post) {
      return res.renderWithLayout("site/post", {
        layout: "layouts/main",
        titulo: "Post não encontrado",
        post: null,
        comentarios: []
      });
    }

    const comentarios = await Comentario.findAll({
      where: {
        post_id: post.id,
        aprovado: true
      },
      order: [["created_at", "DESC"]]
    });

    res.renderWithLayout("site/post", {
      layout: "layouts/main",
      titulo: post.titulo,
      post,
      comentarios
    });
  } catch (err) {
    console.error("Erro no post público:", err);

    // fallback simples (SEM view 500)
    res.status(500).send("Erro interno ao carregar o post");
  }
};
