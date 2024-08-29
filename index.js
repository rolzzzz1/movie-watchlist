// const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const searchForm = document.getElementById("searchForm");

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
    .then((data) => console.log(data));
}
