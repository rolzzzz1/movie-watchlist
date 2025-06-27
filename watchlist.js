const watchList = document.getElementById("watchList");
const emptyWatchlist = document.getElementById("emptyWatchlist");
let myWatchlist;

// Rendering my watchlist
function renderMyWatchlist() {
  myWatchlist = JSON.parse(localStorage.getItem("watchlist"));
  watchList.innerHTML = "";

  if (Object.keys(myWatchlist).length === 0) {
    if (emptyWatchlist.classList.contains("hidden")) {
      emptyWatchlist.classList.remove("hidden");
    }
  } else {
    for (let item in myWatchlist) {
      emptyWatchlist.classList.add("hidden");

      fetch(
        `https://www.omdbapi.com/?apikey=cddaec6f&i=${myWatchlist[item].id}`
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("Something went wrong...");
          }
          return res.json();
        })
        .then((data) => {
          watchList.innerHTML += `
            <div class="movieData">
              <img
                id="moviePoster"
                src=${data.Poster}
                alt="Movie poster"
                class="moviePoster"
              />
              <div class="movieDataText">
                <div class="movieData-top">
                  <h2 class="inter-medium">${data.Title}</h2>
                  <p class="inter-regular">
                    <img src="/img/star.png" /> ${
                      data.Ratings[0].Value.split("/")[0]
                    }
                  </p>
                </div>
                <div class="movieData-middle">
                  <p class="inter-regular">${data.Runtime}</p>
                  <p class="inter-regular">${data.Genre}</p>
                  <button class="plusBtn inter-regular" data-id=${data.imdbID} >
                    <img src="/img/removeIcon.png" data-id=${
                      data.imdbID
                    }  /> Remove
                  </button>
                </div>
                <p class="inter-regular">
                  ${data.Plot}
                </p>
              </div>
            </div>
          `;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

renderMyWatchlist();

// Removing movie from my watchlist
watchList.addEventListener("click", (event) => {
  const eventTarget = event.target;

  if (eventTarget.dataset.id) {
    const movieId = eventTarget.dataset.id;

    myWatchlist = myWatchlist.filter((item) => item.id !== movieId);

    localStorage.setItem("watchlist", JSON.stringify(myWatchlist));
    renderMyWatchlist();
  }
});
