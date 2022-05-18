import React, { useEffect, useState } from 'react'
import './Banner.css'
// note: we want to import from local axios
import axios from './axios';
import requests from './Requests';

function Banner() {
    // initialize movie variable:
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        // internal function:
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request;
        };

        fetchData();
    }, []);

    // n is the number of characters before you want to cut the paragraph off
    function truncate(string, n) {
        // if string is definied and has length greater than n, return portion of string from index 0 to n-1 with "..." added at the end. Else, return the string as is.
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    return (
        <header
            className='banner'
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}>
            <div className='banner_contents'>

                <h1 className='banner_title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className='banner_buttons'>
                    <button className='banner_button'>Play</button>
                    <button className='banner_button'>My List</button>
                </div>

                <h1 className='banner_description'>
                    {
                        truncate(`${movie?.overview}`, 150)
                    }
                </h1>
            </div>

            <div className='banner--fadeBottom' />
        </header>
    )
}

export default Banner