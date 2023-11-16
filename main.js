const itunesUrl = "https://itunes.apple.com/search?term=";
const previewUrl = "https://geo.itunes.apple.com/us/album/";

let inputForm = document.getElementById("inputForm");
let inputField = document.getElementById("inputField");
let results = document.getElementById("results");
let button = document.getElementById("inputButton");
let container = document.getElementById("container");
let preview = document.getElementById("previewUrl");
let songTile = document.getElementById("trackName");

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let term = inputField.value;

  document.addEventListener("autoPlay", (event) => {
    const audio = document.getElementsByTagName("audio");
  });
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  fetch(itunesUrl + term + "&media=music" + "&limit=22" + "&country=us")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        let errorMsg = document.createElement("h2");
        errorMsg.innerText = "API call failed, please try again or reload page.";
        results.appendChild(errorMsg);
      }
    })
    .then((parsedJsonResponse) => {
      console.log(parsedJsonResponse);
      const songs = parsedJsonResponse.results;
      return songs.map((results) => {
        const songCard = document.createElement("div"),
          artist = document.createElement("h2"),
          track = document.createElement("h2"),
          img = document.createElement("img"),
          playButton = document.createElement("button");
        playButton.innerText = "Play Preview";

        playButton.addEventListener("click", (event) => {
          event.preventDefault();
          preview.src = results.previewUrl;
          songTitle.innerText += " " + results.trackName;
        });
        artist.innerHTML = results.artistName;
        track.innerHTML = results.trackName;
        img.src = results.artworkUrl100;

        songCard.appendChild(img);
        songCard.appendChild(artist);
        songCard.appendChild(track);
        songCard.appendChild(playButton);

        container.appendChild(songCard);
      });
    });
});
