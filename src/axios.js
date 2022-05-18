import axios from "axios";

// API requests shall start with:
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

export default instance;