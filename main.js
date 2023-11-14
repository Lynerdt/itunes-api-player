const iTunesUrl = "https://itunes.apple.com/search?term=";
const limit = "&limit=10";
let searchForm = document.getElementById("searchForm");
let searchTerm = document.getElementById("searchField");
let button = document.getElementById("searchButton");
let container = document.getElementById("container");
let preview = document.getElementById("preview");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let term = searchTerm.value;
  console.log(term);
  fetch(iTunesUrl + term + limit, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        let errorMsg = document.createElement("h2");
        errorMsg.innerText = "API call failed, please try again or reload page.";
        container.appendChild(errorMsg);
      }
    })
    .then((parsedJsonResponse) => {
      console.log(parsedJsonResponse);
      const songs = parsedJsonResponse.results;
      return songs.map((results) => {
        (preview.innerHTML = `
      <figure>
        <figcaption>Preview:</figcaption>
        <audio controls src=""></audio>
        </figure>`),
          (container.innerHTML += `
        <div class="songTile">
        <img src=${results.artworkUrl100} />
        <button class="preview">${results.trackName}</button>
        <h3>${results.artistName}</h3>
        </div>`);
      });
    });
});
