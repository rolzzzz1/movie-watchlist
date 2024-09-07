const watchList = document.getElementById("watchList");
let myWatchlist;

function renderMyWatchlist() {
  myWatchlist = JSON.parse(localStorage.getItem("watchlist"));
  console.log(myWatchlist);

  for (let item in myWatchlist) {
    console.log(item);
    console.log(myWatchlist[item]);
    console.log(myWatchlist[item].id);
  }

  // let movie = myWatchlist.find((movie) => movie.id === "tt1856101");
  // console.log(movie);

  for (let index in myWatchlist) {
    console.log(myWatchlist.id);

    fetch(`https://www.omdbapi.com/?apikey=cddaec6f&i=${myWatchlist.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

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
      });
  }
}

renderMyWatchlist();

watchList.addEventListener("click", (event) => {
  const eventTarget = event.target;
  console.log(eventTarget);

  if (eventTarget.dataset.id) {
    const movieId = eventTarget.dataset.id;
    console.log(movieId);

    myWatchlist = myWatchlist.filter((item) => item.id !== movieId);
    console.log(myWatchlist);
  }
});
