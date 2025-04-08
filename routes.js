const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");
const spotifyApiController = require("./controllers/spotifyApiController");
// const profileController = require("./controllers/profileController");
const playlistController = require("./controllers/playlistController");

function initRoutes(app) {
  app.get("/", homeController);
  app.get("/spotify-login", authController().login);
  app.get("/spotify-api", spotifyApiController);
  // app.get("/profile", profileController);
  app.get("/playlist/:id", playlistController);
}

module.exports = initRoutes;
//http://127.0.0.1:3000/spotify-api
