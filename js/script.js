//1
const global = {
  currentPage: window.location.pathname,
};
//example: https://api.themoviedb.org/3/movie/550?api_key=622c3d18c0526c87dc99f4bc7dcbd63c
//6
async function displayTvShows() {
  const { results } = await fetchAPIData("/tv/popular");
  console.log(results);
}

//5
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  const movieGrid = document.querySelector("#popular-movies");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
              <a href="movie-details.html?id=${movie.id}">
            ${
              //if else with ternary op
              movie.poster_path
                ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                    />`
                : `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}/small>
            </p>
          </div>
          `;
    movieGrid.appendChild(div);
  });
}

//4 fetch global data od tmdb api
async function fetchAPIData(endpoint) {
  //endpoint = movie, trending, popular...
  const API_KEY = "622c3d18c0526c87dc99f4bc7dcbd63c";
  const API_URL = "https://api.themoviedb.org/3/"; //version 3

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
}

//3
function highlightActivePage() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

//2 mini router
function initialize() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies(); //5
      break;
    case "/movie-details.html":
      console.log("movie details");
      break;
    case "/shows.html":
      displayTvShows();
      break;
    case "/tv-details.html":
      console.log("tv-details");
      break;
    case "/movie-details.html":
      console.log("movie details");
      break;
    case "/search.html":
      console.log("search");
  }

  highlightActivePage(); //3
}

initialize();
