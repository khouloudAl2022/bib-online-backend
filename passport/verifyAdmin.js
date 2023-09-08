exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: "Access Regicted" });
    }
  } catch (error) {
    console.log("servr error !");
  }
};
