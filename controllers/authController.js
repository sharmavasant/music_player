//https://audius.co/oauth/auth?scope={read|write}&
// api_key={Your API Key}&redirect_uri={Your Redirect URI}&
// origin={Your App Origin}&state={Your State Value}&
// response_mode={query|fragment}

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
    audisLogin(req, res) {
      const scope = "read";
      const authUrl =
        `https://audius.co/oauth/auth?` +
        `scope=${scope}` +
        `&api_key=${process.env.AUDIS_KEY}` +
        `&redirect_uri=${process.env.AUDIS_REDIRECT_URI}`;

      res.redirect(authUrl);
    },
  };
}

module.exports = authController;
