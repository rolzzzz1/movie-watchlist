const watchList = document.getElementById("watchList");

function renderMyWatchlist() {
  myWatchlist = localStorage.getItem("watchlist");
  console.log(myWatchlist);
}

renderMyWatchlist();
