let player;
let currentDeviceId = null;

// Replace this token dynamically when rendering
const token = window.spotifyToken;

window.onSpotifyWebPlaybackSDKReady = () => {
  player = new Spotify.Player({
    name: "Web Playback SDK Player",
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.8,
  });

  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
    currentDeviceId = device_id;
  });

  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  player.addListener("initialization_error", ({ message }) => {
    console.error("Initialization Error:", message);
  });

  player.addListener("authentication_error", ({ message }) => {
    console.error("Authentication Error:", message);
  });

  player.addListener("account_error", ({ message }) => {
    console.error("Account Error:", message);
    alert("Premium Spotify account required to use Web Playback SDK.");
  });

  player.connect();
};

// Play function
async function playSong(uri) {
  if (!currentDeviceId) {
    alert("Player not ready yet!");
    return;
  }

  try {
    await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${currentDeviceId}`,
      {
        method: "PUT",
        body: JSON.stringify({ uris: [uri] }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error("Error playing track:", err);
    alert("Error playing track. Check console for details.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".track-card").forEach((card) => {
    card.addEventListener("click", () => {
      const trackUri = card.getAttribute("data-uri");
      playSong(trackUri);
    });
  });
});
