const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");
const spotifyApiController = require("./controllers/spotifyApiController");
// const profileController = require("./controllers/profileController");
const playlistController = require("./controllers/playlistController");
const audisApiController = require("./controllers/audisApiController");
const audisPlayerController = require("./controllers/audisPlayerController");

function initRoutes(app) {
  app.get("/", homeController);
  app.get("/spotify-login", authController().login);
  app.get("/spotify-api", spotifyApiController);
  // app.get("/profile", profileController);
  app.get("/playlist/:id", playlistController);

  app.get("/audis-login", authController().audisLogin);
  app.get("/audis-api", audisApiController);
  app.get("/audisPlayer", audisPlayerController);
}

module.exports = initRoutes;
//http://127.0.0.1:3000/spotify-api
