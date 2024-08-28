fetch(
  "http://www.omdbapi.com/?apikey=http://www.omdbapi.com/?t=blade+runner&t=blade+runner"
)
  .then((res) => res.json())
  .then((data) => console.log(data));
