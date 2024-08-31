const movieInput = document.getElementById("movieInput");
const searchForm = document.getElementById("searchForm");
const movieList = document.getElementById("movieList");
const startExplore = document.getElementById("startExplore");
const unableMsg = document.getElementById("unable-msg");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch();
});

function handleSearch() {
  fetch(`https://www.omdbapi.com/?apikey=cddaec6f&s=${movieInput.value}`)
    .then((res) => {
      if (!res.ok) {
        throw Error("Something went wrong...");
      }
      return res.json();
    })
    .then((data) => {
      if (data.Response) {
        console.log("Response - " + data.Response);
        startExplore.classList.add("hidden");
        movieList.classList.remove("hidden");
        populateMovie(data.Search);
      } else {
        console.log("Response - " + data.Response);
        throw Error("Something went wrong...");
      }
    })
    .catch((err) => {
      console.log(err);
      unableMsg.classList.remove("hidden");
    });
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
                <button class="plusBtn inter-regular" data-id=${data.imdbID}>
                  <img src="/img/plusIcon.png" /> Watchlist
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

let plusBtns = document.getElementsByClassName("plusBtn");
console.log(plusBtns);
