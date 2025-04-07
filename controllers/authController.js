function authController() {
  return {
    login(req, res) {
      //   res.send("spotify login route executed");
      //   const clientId = process.env.clientId;
      const clientId = process.env.CLIENT_ID;
      const redirectUri = process.env.REDIRECT_URI;
      const scopes = [
        "user-read-private",
        "user-read-email",
        "user-library-read",
        "playlist-read-private",
        "streaming",
        "user-read-playback-state",
        "user-modify-playback-state",
      ].join(" ");

      const authUrl =
        `https://accounts.spotify.com/authorize?` +
        `client_id=${clientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(scopes)}`;

      res.redirect(authUrl); // Redirect user to this URL
    },
    register(req, res) {},
  };
}

module.exports = authController;
