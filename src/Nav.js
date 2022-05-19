import React, { useEffect, useState } from 'react'

// connect the Nav css file:
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        // if you scroll more than 100 on your screen, show black background of NavBar:
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    // runs once only when component did mount:
    useEffect(() => {
        // when you scroll, invoke transitionNavBar:
        window.addEventListener("scroll", transitionNavBar);
        // clean up by removing this event listener:
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, [])

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <div className='nav_contents'>
                <img
                    className='nav_logo'
                    src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
                    alt=''
                />

                <div className='nav_links'>
                    <div className='nav_link'>Home</div>
                    <div className='nav_link'>TV Shows</div>
                    <div className='nav_link'>Movies</div>
                    <div className='nav_link'>New & Popular</div>
                    <div className='nav_link'>My List</div>
                </div>


                <img
                    className='nav_searchGlasses'
                    src='https://www.queryly.com/images/whitesearchicon.png'
                    alt=''
                />

                <img
                    className='nav_avatar'
                    src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                    alt=''
                />

            </div>
        </div>
    )
}

export default Nav