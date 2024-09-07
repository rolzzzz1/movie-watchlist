const movieInput = document.getElementById("movieInput");
const searchForm = document.getElementById("searchForm");
const movieList = document.getElementById("movieList");
const startExplore = document.getElementById("startExplore");
const unableMsg = document.getElementById("unable-msg");
let myWatchlist = [];

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch();
});

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

function handleSearch() {
  fetch(`https://www.omdbapi.com/?apikey=cddaec6f&s=${movieInput.value}`)
    .then((res) => {
      if (!res.ok) {
        throw Error("Something went wrong...");
      }
      return res.json();
    })
    .then((data) => {
      clearMovieList();
      if (data.Response === "True") {
        console.log("Response - " + data.Response);

        if (!unableMsg.classList.contains("hidden")) {
          unableMsg.classList.add("hidden");
        }

        if (!startExplore.classList.contains("hidden")) {
          hideStartExplore();
          movieList.classList.remove("hidden");

          const initialSearchResults = data.Search;
          const detailedSearchResults = Promise.allSettled(
            initialSearchResults.map(
              async (result) => await getCompleteFilmDetails(result.imdbID)
            )
          );

          console.log(detailedSearchResults);

          populateMovie(data.Search);
        } else {
          movieList.classList.remove("hidden");
          populateMovie(data.Search);
        }
      } else {
        console.log("Response - " + data.Response);

        if (unableMsg.classList.contains("hidden")) {
          unableMsg.classList.remove("hidden");
        }

        if (!startExplore.classList.contains("hidden")) {
          hideStartExplore();
          // unableMsg.classList.remove("hidden");
          // movieList.classList.add("hidden");
        } else {
          // unableMsg.classList.remove("hidden");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getCompleteFilmDetails(imdbID) {
  const apiUrl = "https://www.omdbapi.com/?apikey=cddaec6f&" + `i=${imdbID}`;

  try {
    const response = await fetch(apiUrl);
    const data = response.json();

    if (data.Response === "False") {
      throw new Error(`Could not get film details for search ID: ${imdbID}`);
    }

    return data;
  } catch (err) {
    console.error(err);
  }
}

movieList.addEventListener("click", (event) => {
  const eventTarget = event.target;

  if (eventTarget.dataset.id) {
    const movieId = eventTarget.dataset.id;
    const movieTitle = eventTarget.dataset.name;
    console.log(movieId);
    console.log(movieTitle);

    myWatchlist.push(`{ ${movieId}: ${movieTitle} }`);
    localStorage.setItem("watchlist", JSON.stringify(myWatchlist));
  }
});

// const clickedIcon = document.querySelector(
//   `.plusBtn > i[data-id="${likedButtonMediaId}"]`
// );

// const initialSearchResults = data.Search;
// const detailedSearchResults = await Promise.allSettled(initialSearchResults.map(async result => await getCompleteFilmDetails(baseUrl, result.imdbID)));

function clearMovieList() {
  movieList.innerHTML = "";
}

function populateMovie(mList) {
  console.log(mList);

  for (let movie in mList) {
    let currentMovie = mList[movie];
    console.log(currentMovie.imdbID);

    fetch(`https://www.omdbapi.com/?apikey=cddaec6f&i=${currentMovie.imdbID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

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
                <button class="plusBtn inter-regular" data-id=${
                  data.imdbID
                } data-name=${data.Title}>
                  <img src="/img/plusIcon.png" data-id=${
                    data.imdbID
                  } data-name=${data.Title} /> Watchlist
                </button>
              </div>
              <p class="inter-regular">
                ${data.Plot}
              </p>
            </div>
          </div>
        `;
      });
  }
}
