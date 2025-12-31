const fs = require("fs");
const path = require("path");

const Post = require("../models/Post");
const Secao = require("../models/Secao");
const PostImagem = require("../models/PostImagem");

/* ===============================
   HELPERS
=============================== */
function extrairYoutubeId(valor) {
  if (!valor) return null;
  if (valor.length === 11 && !valor.includes("http")) return valor;
  const match = valor.match(/v=([^&]+)/);
  return match ? match[1] : null;
}

/* ===============================
   LISTAR POSTS
=============================== */
exports.index = async (req, res) => {
  const posts = await Post.findAll({
    include: Secao,
    order: [["criado_em", "DESC"]]
  });

  res.renderWithLayout("admin/posts/index", {
    layout: "layouts/admin",
    titulo: "Gerenciar Posts",
    posts
  });
};

/* ===============================
   FORM NOVO POST
=============================== */
exports.createForm = async (req, res) => {
  const secoes = await Secao.findAll({
    where: { ativa: true },
    order: [["ordem", "ASC"]]
  });

  res.renderWithLayout("admin/posts/form", {
    layout: "layouts/admin",
    titulo: "Novo Post",
    post: null,
    secoes
  });
};

/* ===============================
   CRIAR POST
=============================== */
exports.store = async (req, res) => {
  const {
    titulo,
    descricao,
    conteudo,
    secao_id,
    video_youtube,
    coord_x,
    coord_y,
    coord_z,
    dimensao,
    imagem
  } = req.body;

  const videoId = extrairYoutubeId(video_youtube);

  let imagemFinal = imagem || null;
  if (req.files?.imagem_upload?.[0]) {
    imagemFinal = `/uploads/posts/${req.files.imagem_upload[0].filename}`;
  }

  const post = await Post.create({
    titulo,
    descricao,
    conteudo,
    secao_id,
    imagem: imagemFinal,
    video_youtube: videoId,
    coord_x: coord_x || null,
    coord_y: coord_y || null,
    coord_z: coord_z || null,
    dimensao: dimensao || null,
    criado_em: new Date()
  });

  if (req.files?.galeria?.length) {
    await PostImagem.bulkCreate(
      req.files.galeria.map(file => ({
        post_id: post.id,
        imagem: `/uploads/posts/${file.filename}`
      }))
    );
  }

  res.redirect("/admin/posts");
};

/* ===============================
   FORM EDITAR POST (CORRIGIDO)
=============================== */
exports.editForm = async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [
      Secao,
      { model: PostImagem, as: "imagens" }
    ]
  });

  const secoes = await Secao.findAll({
    where: { ativa: true },
    order: [["ordem", "ASC"]]
  });

  if (!post) return res.redirect("/admin/posts");

  res.renderWithLayout("admin/posts/form", {
    layout: "layouts/admin",
    titulo: "Editar Post",
    post,
    secoes
  });
};

/* ===============================
   ATUALIZAR POST
=============================== */
exports.update = async (req, res) => {
  const {
    titulo,
    descricao,
    conteudo,
    secao_id,
    video_youtube,
    coord_x,
    coord_y,
    coord_z,
    dimensao,
    imagem
  } = req.body;

  const videoId = extrairYoutubeId(video_youtube);

  let imagemFinal = imagem || null;
  if (req.files?.imagem_upload?.[0]) {
    imagemFinal = `/uploads/posts/${req.files.imagem_upload[0].filename}`;
  }

  await Post.update(
    {
      titulo,
      descricao,
      conteudo,
      secao_id,
      imagem: imagemFinal,
      video_youtube: videoId,
      coord_x: coord_x || null,
      coord_y: coord_y || null,
      coord_z: coord_z || null,
      dimensao: dimensao || null
    },
    { where: { id: req.params.id } }
  );

  if (req.files?.galeria?.length) {
    await PostImagem.bulkCreate(
      req.files.galeria.map(file => ({
        post_id: req.params.id,
        imagem: `/uploads/posts/${file.filename}`
      }))
    );
  }

  res.redirect(`/admin/posts/${req.params.id}/editar`);
};

/* ===============================
   EXCLUIR POST
=============================== */
exports.destroy = async (req, res) => {
  await Post.destroy({ where: { id: req.params.id } });
  res.redirect("/admin/posts");
};

/* ===============================
   EXCLUIR IMAGEM DA GALERIA
=============================== */
exports.excluirImagem = async (req, res) => {
  const imagem = await PostImagem.findByPk(req.params.id);
  if (!imagem) return res.redirect("/admin/posts");

  const caminhoArquivo = path.join(
    __dirname,
    "../../public",
    imagem.imagem
  );

  if (fs.existsSync(caminhoArquivo)) {
    fs.unlinkSync(caminhoArquivo);
  }

  const postId = imagem.post_id;
  await imagem.destroy();

  res.redirect(`/admin/posts/${postId}/editar`);
};
