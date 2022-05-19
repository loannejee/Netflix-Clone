import axios from "axios";

// Set the base URL with the local axios file
// API requests shall start with:
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

export default instance;