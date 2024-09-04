const watchList = document.getElementById("watchList");

function renderMyWatchlist() {
  myWatchlist = JSON.parse(localStorage.getItem("watchlist"));
  console.log(myWatchlist);
  for (let index in myWatchlist) {
    console.log(myWatchlist[index]);
  }
}

renderMyWatchlist();
