const movieInput = document.getElementById("movieInput");
const searchForm = document.getElementById("searchForm");
const movieList = document.getElementById("movieList");
const startExplore = document.getElementById("startExplore");
const unableMsg = document.getElementById("unable-msg");
let myWatchlist =
  localStorage.getItem("watchlist") == null
    ? []
    : JSON.parse(localStorage.getItem("watchlist"));

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
        // console.log("Response - " + data.Response);

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
        // console.log("Response - " + data.Response);

        if (unableMsg.classList.contains("hidden")) {
          unableMsg.classList.remove("hidden");
        }

        if (!startExplore.classList.contains("hidden")) {
          hideStartExplore();
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
    // console.log(movieId);

    let obj = {
      id: movieId,
    };

    myWatchlist.push(obj);
    console.log(myWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(myWatchlist));
  }
});

function clearMovieList() {
  movieList.innerHTML = "";
}

let plusBtns = document.getElementsByClassName("plusBtn");
console.log(plusBtns);
console.log(plusBtns[0].setAttribute("disabled", true));

function populateMovie(mList) {
  // console.log(mList);

  let storedWatchlist =
    localStorage.getItem("watchlist") == null
      ? []
      : JSON.parse(localStorage.getItem("watchlist"));
  console.log(storedWatchlist);
  // let storedWatchlist1 = storedWatchlist.filter(
  //   (item) => item.id === "tt0475723"
  // );
  // console.log(storedWatchlist1);

  for (let movie in mList) {
    let currentMovie = mList[movie];
    // console.log(currentMovie.imdbID);

    let isAlreadyWatchlist = storedWatchlist.find(
      (e) => e.id === currentMovie.imdbID
    );

    console.log(isAlreadyWatchlist);

    // plusBtns[0].setAttribute("disabled", true);

    if (isAlreadyWatchlist) {
      console.log("valid");
      // document.getElementById("plusBtn").disabled = true;
    }

    fetch(`https://www.omdbapi.com/?apikey=cddaec6f&i=${currentMovie.imdbID}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

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
                <button class="plusBtn inter-regular" data-id=${data.imdbID}>
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
      });
  }
}
