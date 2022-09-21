module.exports = (req, res, next) => {
  if (!(req.session.userId === "630ceff228b661866621f0df")) {
    return res.redirect("/");
  }

  next();
};
