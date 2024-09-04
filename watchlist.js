const watchList = document.getElementById("watchList");

function renderMyWatchlist() {
  myWatchlist = localStorage.getItem("watchlist");
  console.log(myWatchlist);

  for (let id in myWatchlist) {
    console.log(myWatchlist[id]);
  }
}

renderMyWatchlist();
