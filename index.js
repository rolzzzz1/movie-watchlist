const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");

searchBtn.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch();
});

function handleSearch() {
  console.log(movieInput.value);

  fetch("https://www.omdbapi.com/?apikey=cddaec6f&t=blade+runner")
    .then((res) => res.json())
    .then((data) => console.log(data));
}
