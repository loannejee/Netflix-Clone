import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from './axios';

// Can destructure the props:
// By default, isLargeRow is false. It will be true if we get props passed into it.
function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        // The dependency is fetchUrl
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            // with any promise or async, you should always return something
            return request;
        };

        fetchData();
    }, [fetchUrl]);

    console.log(movies)

    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className='row_posters'>
                {
                    movies.map((movie) => (
                        // render if 
                        isLargeRow && movie.poster_path ||
                        (!isLargeRow && movie.backdrop_path && (
                            <img
                                // if isLargeRow is true, the className shall be "row_posterLarge" instead
                                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                        )
                    ))
                }
            </div>

        </div>
    )
}

export default Row