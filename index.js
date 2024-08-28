fetch("http://www.omdbapi.com/?apikey=cddaec6f&t=blade+runner")
  .then((res) => res.json())
  .then((data) => console.log(data));
