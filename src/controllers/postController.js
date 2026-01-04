const Post = require("../models/Post");
const Secao = require("../models/Secao");
const PostImagem = require("../models/PostImagem");
const Comentario = require("../models/Comentario");

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
      return res.status(404).renderWithLayout("site/404", {
        layout: "layouts/main",
        titulo: "Post não encontrado"
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
    console.error(err);
    res.status(500).renderWithLayout("site/500", {
      layout: "layouts/main",
      titulo: "Erro"
    });
  }
};
