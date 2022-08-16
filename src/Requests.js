// https://www.npmjs.com/package/react-dotenv
// REMEMBER: add new keys to package.json; refer to link above ^; You also need to re-launch the localhost ---> npm start
import env from "react-dotenv";

console.log('hiii')

// Here are all the different endpoints for genres that TMDB can give us:
// We need to append these endpoints to our baseURL.
const requests = {
    fetchTrending: `/trending/all/week?api_key=${env.TMDB_KEY}&language=en-US`, 
    fetchNetflixOriginals: `/discover/tv?api_key=${env.TMDB_KEY}&with_networks=213`,
    fetchTopRated: `/trending/all/week?api_key=${env.TMDB_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${env.TMDB_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${env.TMDB_KEY}&with_genres=35`, 
    fetchHorrorMovies: `/discover/movie?api_key=${env.TMDB_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${env.TMDB_KEY}&with_genres=10749`, 
    fetchDocumentaries: `/discover/movie?api_key=${env.TMDB_KEY}&with_genres=99`,
}

export default requests;

// https://api.themoviedb.org/3/discover/movie?api_key=env.TMDB_KEY&with_genres=27
