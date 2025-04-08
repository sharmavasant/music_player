// let player;
// let currentDeviceId = null;
// let isPaused = true; // Track player state

// // Replace this token dynamically when rendering
// const token = window.spotifyToken;

// window.onSpotifyWebPlaybackSDKReady = () => {
//   player = new Spotify.Player({
//     name: "Web Playback SDK Player",
//     getOAuthToken: (cb) => {
//       cb(token);
//     },
//     volume: 0.8,
//   });

//   player.addListener("ready", ({ device_id }) => {
//     console.log("Ready with Device ID", device_id);
//     currentDeviceId = device_id;

//     // Show player controls
//     const controls = document.createElement("div");
//     controls.style.position = "fixed";
//     controls.style.bottom = "20px";
//     controls.style.right = "20px";
//     controls.style.background = "#1db954";
//     controls.style.color = "#fff";
//     controls.style.padding = "10px 20px";
//     controls.style.borderRadius = "50px";
//     controls.style.cursor = "pointer";
//     controls.style.fontWeight = "bold";
//     controls.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
//     controls.innerText = "Play";

//     controls.addEventListener("click", () => {
//       if (isPaused) {
//         player.resume().then(() => {
//           isPaused = false;
//           controls.innerText = "Pause";
//         });
//       } else {
//         player.pause().then(() => {
//           isPaused = true;
//           controls.innerText = "Play";
//         });
//       }
//     });

//     document.body.appendChild(controls);
//   });

//   player.addListener("not_ready", ({ device_id }) => {
//     console.log("Device ID has gone offline", device_id);
//   });

//   player.addListener("initialization_error", ({ message }) => {
//     console.error("Initialization Error:", message);
//   });

//   player.addListener("authentication_error", ({ message }) => {
//     console.error("Authentication Error:", message);
//   });

//   player.addListener("account_error", ({ message }) => {
//     console.error("Account Error:", message);
//     alert("Premium Spotify account required to use Web Playback SDK.");
//   });

//   // Keep track of playback state
//   player.addListener("player_state_changed", (state) => {
//     if (!state) return;
//     isPaused = state.paused;
//     const controls = document.querySelector("#player-controls");
//     if (controls) {
//       controls.innerText = isPaused ? "Play" : "Pause";
//     }
//   });

//   player.connect();
// };

// // Play function
// async function playSong(uri) {
//   if (!currentDeviceId) {
//     alert("Player not ready yet!");
//     return;
//   }

//   try {
//     await fetch(
//       `https://api.spotify.com/v1/me/player/play?device_id=${currentDeviceId}`,
//       {
//         method: "PUT",
//         body: JSON.stringify({ uris: [uri] }),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   } catch (err) {
//     console.error("Error playing track:", err);
//     alert("Error playing track. Check console for details.");
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll(".track-card").forEach((card) => {
//     card.addEventListener("click", () => {
//       const trackUri = card.getAttribute("data-uri");
//       playSong(trackUri);
//     });
//   });
// });

//-------------------------NEW-----------------------------------------------

let player;
let currentDeviceId = null;
let currentTrackDuration = 0;
let updateInterval;
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

  player.addListener("player_state_changed", (state) => {
    if (!state) return;

    currentTrackDuration = state.duration;

    const playPauseBtn = document.getElementById("playPauseBtn");
    if (state.paused) {
      playPauseBtn.textContent = "Play";
    } else {
      playPauseBtn.textContent = "Pause";
    }

    updateSeekBar(state.position, state.duration);
  });

  player.connect();
};

// Play a track
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

    document.getElementById("playerModal").style.display = "block";
  } catch (err) {
    console.error("Error playing track:", err);
    alert("Error playing track. Check console for details.");
  }
}

// Toggle play/pause
function togglePlayPause() {
  player.togglePlay();
}

// Seek position
function seekToPosition(positionMs) {
  player.seek(positionMs);
}

// Update seek bar position
function updateSeekBar(position, duration) {
  const seekSlider = document.getElementById("seekSlider");
  seekSlider.max = duration;
  seekSlider.value = position;
}

// Volume control
function changeVolume(value) {
  player.setVolume(value);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".track-card").forEach((card) => {
    card.addEventListener("click", () => {
      const trackUri = card.getAttribute("data-uri");
      playSong(trackUri);
    });
  });

  // Modal controls
  document
    .getElementById("playPauseBtn")
    .addEventListener("click", togglePlayPause);

  document.getElementById("seekSlider").addEventListener("input", (e) => {
    seekToPosition(e.target.value);
  });

  document.getElementById("volumeSlider").addEventListener("input", (e) => {
    changeVolume(e.target.value);
  });

  document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("playerModal").style.display = "none";
  });
});
