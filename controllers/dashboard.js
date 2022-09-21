module.exports = (req, res) => {
  if (!(req.session.userId == "630ceff228b661866621f0df")) {
    return res.redirect(`/login`);
  }
  res.redirect(`/dashboard/${req.session.userId}`);
};
