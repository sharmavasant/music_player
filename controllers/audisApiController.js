const axios = require("axios");

function audisApiController(req, res) {
  //   console.log(res);
  //   const authHeader = req.headers["authorization"];
  if (req.headers["content-type"] == "application/json") {
    const authHeader = req.headers["authorization"];
    // console.log(authHeader);
    req.session.audis_token = authHeader;
  }
  //   console.log(req);
  res.render("audisPage");
}

module.exports = audisApiController;
