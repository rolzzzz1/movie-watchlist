const watchList = document.getElementById("watchList");

function renderMyWatchlist() {
  myWatchlist = localStorage.getItem("watchlist");
  console.log(myWatchlist[0]);
  console.log(myWatchlist[1]);
  console.log(myWatchlist[2]);
}

renderMyWatchlist();
