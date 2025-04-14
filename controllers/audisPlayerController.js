function audisPlayerController(req, res) {
  //   console.log(req.headers);
  const authHeader = req.headers["Authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "No authorization header" });
  }
  const token = authHeader.split(" ")[1];
  console.log("token from frontend", token);
  res.render("audisPage");
}

module.exports = audisPlayerController;
