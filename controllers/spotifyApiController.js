//https://api.spotify.com/v1/me
//https://api.spotify.com/v1/me/playlists

const axios = require("axios");

async function spotifyApiController(req, res) {
  const code = req.query.code;
  console.log(code);
  if (!code) {
    res.send("Some error occurred");
  }
  //   try {
  //     res.send(`received code ${code}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        },
      }
    );
    console.log(response);
    const { access_token, refresh_token, expires_in } = response.data;
    req.session.access_token = access_token;
    req.session.refresh_token = refresh_token;
    req.session.expires_in = expires_in;
    console.log(req);
    console.log(access_token);
    console.log(refresh_token);
    console.log(expires_in);

    // res.send({
    //   access_token,
    //   refresh_token,
    //   expires_in,
    // });
    try {
      const response2 = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response2.data);
      res.render("profile", { access_token, refresh_token, expires_in });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = spotifyApiController;
