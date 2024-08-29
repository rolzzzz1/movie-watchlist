// const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const searchForm = document.getElementById("searchForm");
const movieList = document.getElementById("movieList");

// searchBtn.addEventListener("click", (event) => {
//   event.preventDefault();
//   handleSearch();
// });

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch();
});

function handleSearch() {
  // fetch("https://www.omdbapi.com/?apikey=cddaec6f&t=blade+runner")

  fetch(`https://www.omdbapi.com/?apikey=cddaec6f&t=${movieInput.value}`)
    .then((res) => res.json())
    .then((data) => populateMovie(data));
}

function populateMovie(data) {
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
            <img src="/img/star.png" /> ${data.Ratings[0].Value.split("/")[0]}
          </p>
        </div>
        <div class="movieData-middle">
          <p class="inter-regular">${data.Runtime}</p>
          <p class="inter-regular">${data.Genre}</p>
          <button class="plusBtn inter-regular">
            <img src="/img/plusIcon.png" /> Watchlist
          </button>
        </div>
        <p class="inter-regular">
          ${data.Plot}
        </p>
      </div>
    </div>;
  `;
}

/* <div class="movieData">
  <img
    id="moviePoster"
    src="https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
    alt="Movie poster"
    class="moviePoster"
  />
  <div class="movieDataText">
    <div class="movieData-top">
      <h2 class="inter-medium">Blade Runner</h2>
      <p class="inter-regular">
        <img src="/img/star.png" /> 8.1
      </p>
    </div>
    <div class="movieData-middle">
      <p class="inter-regular">117min</p>
      <p class="inter-regular">Action, Drama, Sci-fi</p>
      <button class="plusBtn inter-regular">
        <img src="/img/plusIcon.png" /> Watchlist
      </button>
    </div>
    <p class="inter-regular">
      A blade runner must pursue and terminate four replicants who stole a ship
      in space, and have returned to Earth to find their creator.
    </p>
  </div>
</div>; */
