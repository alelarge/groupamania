import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import {
    logout,
  } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
// import logo from '../assets/logo.png'


function LoggedIn({ children }) {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if(!auth.isAuthenticated){
            navigate('/login');
        }
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/login');
    }

    return (
        <div className="container LoggedIn">
            <header className="LoggedIn-header">
                <nav className="LoggedIn__nav">
                {/* <div className='groupamania-banner'>
                    <img src={logo} alt='groupamania' className='groupamania-logo />
                    <h1 className='groupamania-title'>{title}</h1>
                </div> */}
                    <ol>
                        <li className="LoggedIn__nav__item"><Link to="/homepage">Groupomania</Link></li>
                        <li className="LoggedIn__nav__item"><Link to="/post/create">Créer un post</Link></li>
                        <li className="LoggedIn__nav__item"><a onClick={handleLogout} href="#">Se déconnecter</a></li>
                    </ol>
                </nav>
            </header>
            <section className="LoggedIn-content">
                {children}
            </section>
        </div>
    );
}

export default LoggedIn;
