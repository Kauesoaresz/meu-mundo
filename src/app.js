require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");

/* ===========================
    BANCO DE DADOS
=========================== */
const sequelize = require("./config/database");

/* ===========================
    MODELS & ASSOCIAÇÕES
=========================== */
const Secao = require("./models/Secao");
require("./models/Mundo");
require("./models/Post");
require("./models/PostImagem");
require("./models/Afazer");
require("./models/Comentario");
require("./models/Usuario");

// 🔥 ADICIONADO: Importando para variáveis para fazer as relações
const Encantamento = require("./models/Encantamento"); 
const Equipamento = require("./models/Equipamento");

// 🔥 ADICIONADO: Relações Separadas (Obrigatórios e Opcionais)
Equipamento.belongsToMany(Encantamento, {
  through: "equipamento_encantamentos_obrigatorios",
  as: "obrigatorios",
  foreignKey: "equipamento_id"
});
Encantamento.belongsToMany(Equipamento, {
  through: "equipamento_encantamentos_obrigatorios",
  as: "equipamentosObrigatorios",
  foreignKey: "encantamento_id"
});

Equipamento.belongsToMany(Encantamento, {
  through: "equipamento_encantamentos_opcionais",
  as: "opcionais",
  foreignKey: "equipamento_id"
});
Encantamento.belongsToMany(Equipamento, {
  through: "equipamento_encantamentos_opcionais",
  as: "equipamentosOpcionais",
  foreignKey: "encantamento_id"
});

/* ===========================
    APP CONFIG
=========================== */
const app = express();
app.set("trust proxy", 1);

/* ===========================
    VIEW ENGINE
=========================== */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ===========================
    MIDDLEWARES BÁSICOS
=========================== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "meu-mundo-secret-local",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

/* ===========================
    CARREGAR SEÇÕES (NAV) - MIDDLEWARE
=========================== */
app.use(async (req, res, next) => {
  try {
    const secoes = await Secao.findAll({
      where: { ativa: true },
      order: [["ordem", "ASC"]]
    });
    res.locals.secoes = secoes || [];
    next();
  } catch (err) {
    console.error("⚠️ Erro ao carregar seções:", err.message);
    res.locals.secoes = [];
    next();
  }
});

/* ===========================
    RENDER COM LAYOUT
=========================== */
app.use((req, res, next) => {
  res.renderWithLayout = (view, data = {}) => {
    const layout = data.layout || "layouts/main";
    res.render(view, data, (err, html) => {
      if (err) {
        console.error("❌ Erro de renderização:", err);
        return res.status(500).send("Erro interno");
      }
      res.render(layout, { ...data, body: html });
    });
  };
  next();
});

/* ===========================
    ROTAS
=========================== */
const routes = require("./routes");
const adminAfazeresRoutes = require("./routes/adminAfazeres");
const afazeresRoutes = require("./routes/afazeres");
const comentariosRoutes = require("./routes/comentarios");
const adminComentariosRoutes = require("./routes/adminComentarios");
const adminEncantamentosRoutes = require("./routes/adminEncantamentos");
const encantamentosRoutes = require("./routes/encantamentos");
const adminArsenalRoutes = require("./routes/adminArsenal"); // 🔥 ADICIONADO: Rotas do Arsenal
const arsenalPublicoRoutes = require("./routes/arsenalPublico");

app.use("/admin/afazeres", adminAfazeresRoutes);
app.use("/admin/encantamentos", adminEncantamentosRoutes);
app.use("/admin/arsenal", adminArsenalRoutes); // 🔥 ADICIONADO: Prefixo da rota do Arsenal
app.use("/arsenal", arsenalPublicoRoutes);
app.use("/encantamentos", encantamentosRoutes);
app.use("/afazeres", afazeresRoutes);
app.use("/comentarios", comentariosRoutes);
app.use("/admin/comentarios", adminComentariosRoutes);
app.use("/", routes);


/* ===========================
    INICIALIZAÇÃO (MODO LOCAL SEGURO)
=========================== */
sequelize
  .sync({ alter: true }) 
  .then(() => {
    console.log("🟢 MySQL Local: Conectado e Sincronizado com sucesso!");
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🌍 Servidor rodando em: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("🔴 Erro de conexão com o banco local:", err.message);
  });