const watchList = document.getElementById("watchList");

function renderMyWatchlist() {
  myWatchlist = JSON.parse(localStorage.getItem("watchlist"));
  console.log(myWatchlist);
}

renderMyWatchlist();
