import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Error = () =>{

    return(
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>We are sorry, page not found!</h2>
                    <p className="mb-5">
                        The page that you may be looking for might have been removed
                        or had its name changed or temporarily unavailable.
                    </p>
                    <NavLink to="/">Back To Homepage</NavLink>
                </div>
            </div>
        </>
    )

}

export default Error ; 