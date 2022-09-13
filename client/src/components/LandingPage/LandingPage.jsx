import React from 'react';
import {Link} from 'react-router-dom';
import'./LandingPage.css'

export default function LandingPage() {
    return (
        <div className="backg">
            <div>
                <h1 className="title">VIDEOGAMES</h1>
            </div>
            <div className="outer1 button">
                <Link to='/home'>
                    <button target='_blank'>E N T E R</button>
                </Link>
            </div>
        </div>
    )
}