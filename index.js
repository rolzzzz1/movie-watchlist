const movieInput = document.getElementById("movieInput");
const searchForm = document.getElementById("searchForm");
const movieList = document.getElementById("movieList");
const startExplore = document.getElementById("startExplore");
const unableMsg = document.getElementById("unable-msg");
const emptyMsg = document.getElementById("empty-msg");
let myWatchlist =
  localStorage.getItem("watchlist") == null
    ? []
    : JSON.parse(localStorage.getItem("watchlist"));

// Search btn event listener
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch();
});

// Search movie function
function handleSearch() {
  if (movieInput.value === "") {
    clearMovieList();

    hideEmptyMsg();

    showUnableMsg();

    hideStartExplore();
    // if (!startExplore.classList.contains("hidden")) {
    //   hideStartExplore();
    // }
  } else {
    fetch(`https://www.omdbapi.com/?apikey=cddaec6f&s=${movieInput.value}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Something went wrong...");
        }
        return res.json();
      })
      .then((data) => {
        clearMovieList();

        showEmptyMsg();

        if (data.Response === "True") {
          showUnableMsg();

          if (!startExplore.classList.contains("hidden")) {
            hideStartExplore();
            movieList.classList.remove("hidden");

            populateMovie(data.Search);
          } else {
            movieList.classList.remove("hidden");
            populateMovie(data.Search);
          }
        } else {
          hideUnableMsg();

          if (!startExplore.classList.contains("hidden")) {
            hideStartExplore();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Populating movielist
function populateMovie(mList) {
  let storedWatchlist =
    localStorage.getItem("watchlist") == null
      ? []
      : JSON.parse(localStorage.getItem("watchlist"));

  for (let movie in mList) {
    let currentMovie = mList[movie];

    let isAlreadyWatchlist = storedWatchlist.find(
      (e) => e.id === currentMovie.imdbID
    );

    fetch(`https://www.omdbapi.com/?apikey=cddaec6f&i=${currentMovie.imdbID}`)
      .then((res) => res.json())
      .then((data) => {
        movieList.innerHTML += `
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
                <button class="plusBtn inter-regular" id=${
                  data.imdbID
                } data-id=${data.imdbID}>
                  <img src="/img/plusIcon.png" data-id=${
                    data.imdbID
                  }  /> Watchlist
                </button>
              </div>
              <p class="inter-regular">
                ${data.Plot}
              </p>
            </div>
          </div>
        `;

        if (isAlreadyWatchlist) {
          document.getElementById(currentMovie.imdbID).disabled = "disabled";
          document.getElementById(
            currentMovie.imdbID
          ).innerHTML = `<p class="watchlistMsg">Added</p>`;
        }
      });
  }
}

// Movie add btn event listener
movieList.addEventListener("click", (event) => {
  const eventTarget = event.target;
  if (eventTarget.dataset.id) {
    const movieId = eventTarget.dataset.id;

    let obj = {
      id: movieId,
    };

    document.getElementById(movieId).disabled = "disabled";

    document.getElementById(
      movieId
    ).innerHTML = `<p class="watchlistMsg">Added</p>`;

    myWatchlist.push(obj);
    localStorage.setItem("watchlist", JSON.stringify(myWatchlist));
  }
});

function clearMovieList() {
  movieList.innerHTML = "";
}

function showStartExplore() {
  if (startExplore.classList.contains("hidden")) {
    startExplore.classList.remove("hidden");
  }
}

function hideStartExplore() {
  if (!startExplore.classList.contains("hidden")) {
    startExplore.classList.add("hidden");
  }
}

function showEmptyMsg() {
  if (!emptyMsg.classList.contains("hidden")) {
    emptyMsg.classList.add("hidden");
  }
}

function hideEmptyMsg() {
  if (emptyMsg.classList.contains("hidden")) {
    emptyMsg.classList.remove("hidden");
  }
}

function showUnableMsg() {
  if (!unableMsg.classList.contains("hidden")) {
    unableMsg.classList.add("hidden");
  }
}

function hideUnableMsg() {
  if (unableMsg.classList.contains("hidden")) {
    unableMsg.classList.remove("hidden");
  }
}
