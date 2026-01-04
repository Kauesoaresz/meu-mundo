require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");

/* ===========================
   BANCO
=========================== */
const sequelize = require("./config/database");

const { Secao } = models;

/* ===========================
   APP
=========================== */
const app = express();

/* ===========================
   TRUST PROXY (RAILWAY)
=========================== */
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
    secret: process.env.SESSION_SECRET || "meu-mundo-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false // Railway usa HTTPS via proxy
    }
  })
);

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
    console.error("Erro ao carregar seções:", err);
    next(err);
  }
});

/* ===========================
   MIDDLEWARE GLOBAL
=========================== */
const loadSecoes = require("./middlewares/loadSecoes");
app.use(loadSecoes);

/* ===========================
   RENDER COM LAYOUT (SEGURO)
=========================== */
app.use((req, res, next) => {
  res.renderWithLayout = (view, data = {}) => {
    const layout = data.layout || "layouts/main";

    res.render(view, data, (err, html) => {
      if (err) {
        console.error("Erro ao renderizar view:", err);
        return res.status(500).send("Erro interno");
      }

      res.render(layout, {
        ...data,
        body: html
      });
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

/* ROTAS ESPECÍFICAS */
app.use("/admin/afazeres", adminAfazeresRoutes);
app.use("/afazeres", afazeresRoutes);

/* ROTAS GERAIS */
app.use("/", routes);

/* ===========================
   BANCO
=========================== */
sequelize
  .authenticate()
  .then(() => {
    console.log("🟢 Banco conectado");
  })
  .catch((err) => {
    console.error("🔴 Erro no banco:", err);
  });

/* ===========================
   SERVER (RAILWAY READY)
=========================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌍 Meu Mundo rodando na porta ${PORT}`);
});
