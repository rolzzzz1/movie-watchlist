const watchList = document.getElementById("watchList");
let myWatchlist;

function renderMyWatchlist() {
  myWatchlist = JSON.parse(localStorage.getItem("watchlist"));
  console.log(myWatchlist);
  for (let index in myWatchlist) {
    console.log(myWatchlist[index]);

    fetch(`https://www.omdbapi.com/?apikey=cddaec6f&i=${myWatchlist[index]}`)
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
                <button class="plusBtn inter-regular" data-id=${data.imdbID}>
                  <img src="/img/removeIcon.png" data-id=${
                    data.imdbID
                  } /> Remove
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

  if (eventTarget.dataset.id) {
    const movieId = eventTarget.dataset.id;
    console.log(movieId);
    console.log(myWatchlist);
    console.log(typeof myWatchlist);

    let arr = Object.values(myWatchlist);
    console.log(arr);
    let index1 = arr.indexOf(movieId);
    // delete myWatchlist(index1);
    console.log(index1);
    console.log(typeof index1);

    delete myWatchlist[index1];

    const updatedObj = Object.fromEntries(
      Object.entries(myWatchlist).filter(([key]) => key !== index1)
    );

    console.log(updatedObj);

    if (Object.values(myWatchlist).includes(movieId)) {
      console.log("it is in mywatchlist");
      for (let i in myWatchlist) {
        console.log("Index - " + i);
        console.log("Value - " + myWatchlist[i]);
      }
    } else {
      console.log("It is not in my watchlist");
    }
  }
});
