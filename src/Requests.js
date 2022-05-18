const TMDB_KEY = "f81980ff410e46f422d64ddf3a56dddd"

// Here are all the different endpoints for genres that TMDB can give us:
// We need to append these endpoints to our baseURL.
const requests = {
    fetchTrending: `/trending/all/week?api_key=${TMDB_KEY}&language=en-US`, fetchNetflixOriginals: `/discover/tv?api_key=${TMDB_KEY}&with_networks=213`,
    fetchComedyMovies: `/discover/movie?api_key=${TMDB_KEY}&with_genres=35`, fetchHorrorMovies: `/discover/movie?api_key=${TMDB_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${TMDB_KEY}&with_genres=10749`, fetchDocumentaries: `/discover/movie?api_key=${TMDB_KEY}&with_genres=99`,
}

export default requests;