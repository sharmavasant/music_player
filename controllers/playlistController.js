const { default: axios } = require("axios");

async function playlistController(req, res) {
  const access_token = req.session.access_token;
  const refresh_token = req.session.refresh_token;
  const expires_in = req.session.expires_in;
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}/tracks?limit=20`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = response.data;
    const tracks = data.items;

    res.render("playlist", { tracks, access_token, refresh_token, expires_in }); // 👈 render playlist.ejs (or pug, or hbs)
  } catch (error) {
    console.error("Error fetching playlist:", error.message);
    res.status(500).send("Failed to fetch playlist");
  }
}

module.exports = playlistController;
