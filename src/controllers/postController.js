const { Post, Secao, PostImagem, Comentario } = require("../models");

exports.show = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        Secao,
        { model: PostImagem, as: "imagens" }
      ]
    });

    if (!post) {
      return res.status(404).send("Post não encontrado");
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
    res.status(500).send("Erro interno ao carregar o post");
  }
};
