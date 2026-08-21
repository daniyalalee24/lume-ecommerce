const getAdminDashboard = async (req, res) => {
  res.json({
    message: "Welcome to the admin dashboard",
    user: req.user.name,
  });
};

module.exports = {
  getAdminDashboard,
};
