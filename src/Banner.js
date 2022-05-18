import React from 'react'

import './Banner.css'

function Banner() {
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
                backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_flag.svg/1200px-Black_flag.svg.png")`,
                backgroundPosition: "center center",
            }}>
            <div className='banner_contents'>

                <h1 className='banner_title'>Movie Name</h1>

                <div className='banner_buttons'>
                    <button className='banner_button'>Play</button>
                    <button className='banner_button'>My List</button>
                </div>

                <h1 className='banner_description'>
                    {
                        truncate('Description goes here.', 150)
                    }
                </h1>
            </div>

            <div className='banner--fadeBottom' />
        </header>
    )
}

export default Banner