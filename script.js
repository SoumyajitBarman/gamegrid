const API_KEY = "29e472fbed2b4c539a42378c6d12f75e";
const USE_BACKEND = window.location.protocol === 'http:' && window.location.port === '3000';

async function searchGames() {
  console.log("Button clicked");

  const ratingFilter = document.getElementById("ratingFilter").value;

  const query = document.getElementById("searchInput").value.trim();
  localStorage.setItem("lastSearch", query);

  if (!query) {
    alert("Enter a game name");
    return;
  }

  const resultsDiv = document.getElementById("results");
  const loader = document.getElementById("loader");

  resultsDiv.innerHTML = "";      // clear old results
  loader.style.display = "block"; // show spinner

  // Use backend if available, otherwise direct API call
  const url = USE_BACKEND 
    ? `/api/games?search=${query}`
    : `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    loader.style.display = "none"; // 🔥 hide spinner
    localStorage.setItem("lastResults", JSON.stringify(data.results));

    if (data.results.length === 0) {
  loader.style.display = "none"; // 🔥 ADD THIS
  resultsDiv.innerHTML = "<p>No games found 😢</p>";
  return;
}

    resultsDiv.innerHTML = "";

    data.results
  .filter(game => {
    if (!ratingFilter) return true;
    return game.rating >= Number(ratingFilter);
  })
  .forEach(game => {
      const gameCard = `
        <div class="game-card" onclick="openGame(${game.id})">
          <img src="${game.background_image || 'https://via.placeholder.com/200'}" width="200"/>
          <h3>${game.name}</h3>
          <p>⭐ Rating: ${game.rating}</p>
          <p>📅 Released: ${game.released}</p>
        </div>
      `;

      resultsDiv.innerHTML += gameCard;
    });

  } catch (error) {
    loader.style.display = "none"; // 🔥 hide spinner on error
    console.log("Error:", error);
    resultsDiv.innerHTML = "<p>Something went wrong ⚠️</p>";
  }
}

document.getElementById("searchBtn").addEventListener("click", searchGames);

// Enter key support
document.getElementById("searchInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchGames();
  }
});

window.onload = function () {

  if (!sessionStorage.getItem("fromGamePage")) {
    localStorage.removeItem("lastResults");
    localStorage.removeItem("lastSearch");
    return;
  }

  sessionStorage.removeItem("fromGamePage");

  const savedResults = localStorage.getItem("lastResults");
  const lastSearch = localStorage.getItem("lastSearch");

  if (lastSearch) {
    document.getElementById("searchInput").value = lastSearch;
  }

  if (savedResults) {
    const results = JSON.parse(savedResults);
    const resultsDiv = document.getElementById("results");


    resultsDiv.innerHTML = "";

    results.forEach(game => {
      const gameCard = `
        <div class="game-card" onclick="openGame(${game.id})">
          <img src="${game.background_image || 'https://via.placeholder.com/200'}"/>
          <h3>${game.name}</h3>
          <p>⭐ Rating: ${game.rating}</p>
          <p>📅 Released: ${game.released}</p>
        </div>
      `;
      resultsDiv.innerHTML += gameCard;
    });
  }
};

function openGame(id) {
  sessionStorage.setItem("fromGamePage", "true"); // REQUIRED
  window.location.href = `game.html?id=${id}`;
}


