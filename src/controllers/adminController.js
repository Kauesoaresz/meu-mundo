exports.dashboard = (req, res) => {
  res.renderWithLayout("admin/dashboard", {
  layout: "layouts/admin",
  titulo: "Admin"
});

};
