exports.loginForm = (req, res) => {
  res.render("auth/simple-login", {
    titulo: "Acesso restrito"
  });
};

exports.login = (req, res) => {
  const { senha } = req.body;

  if (senha !== process.env.ADMIN_PASSWORD) {
    return res.send("Senha incorreta");
  }

  req.session.admin = true;
  res.redirect("/admin");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
