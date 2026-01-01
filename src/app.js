require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");

const sequelize = require("./config/database");
const routes = require("./routes");
const loadSecoes = require("./middlewares/loadSecoes");

const adminAfazeresRoutes = require("./routes/adminAfazeres");
const afazeresRoutes = require("./routes/afazeres");

const Secao = require("./models/Secao");

const app = express();

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

app.use(session({
  secret: "meu-mundo-secret",
  resave: false,
  saveUninitialized: false
}));

/* ===========================
   CARREGAR SEÇÕES (NAV)
=========================== */
app.use(async (req, res, next) => {
  try {
    const secoes = await Secao.findAll({
      where: { ativa: true },
      order: [["ordem", "ASC"]]
    });

    res.locals.secoes = secoes;
    next();
  } catch (err) {
    next(err);
  }
});

/* ===========================
   MIDDLEWARE GLOBAL
=========================== */
app.use(loadSecoes);

/* ===========================
   RENDER COM LAYOUT
=========================== */
app.use((req, res, next) => {
  res.renderWithLayout = (view, data) => {
    res.render(view, data, (err, html) => {
      if (err) return res.status(500).send(err.message);
      res.render(data.layout, { ...data, body: html });
    });
  };
  next();
});

/* ===========================
   ROTAS — ORDEM CORRETA
=========================== */

/* 🔥 ROTAS ESPECÍFICAS PRIMEIRO */
app.use("/admin/afazeres", adminAfazeresRoutes);
app.use("/afazeres", afazeresRoutes);

/* 🔥 ROTAS GENÉRICAS POR ÚLTIMO */
app.use("/", routes);

/* ===========================
   BANCO
=========================== */
sequelize.authenticate()
  .then(() => console.log("🟢 Banco conectado"))
  .catch(() => console.log("🔴 Erro no banco"));

/* ===========================
   SERVER
=========================== */
app.listen(3000, () => {
  console.log("🌍 Meu Mundo rodando em http://localhost:3000");
});
