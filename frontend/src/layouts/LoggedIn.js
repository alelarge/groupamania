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
            <header className="row LoggedIn-header">
                {/* <div className='groupamania-banner'>
                    <img src={logo} alt='groupamania' className='groupamania-logo />
                    <h1 className='groupamania-title'>{title}</h1>
                </div> */}
                <ul className="nav">
                    <li className="nav-item"><Link className="nav-link" to="/homepage">Groupomania</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/post/create">Créer un post</Link></li>
                    <li className="nav-item"><a className="nav-link" onClick={handleLogout} href="#">Se déconnecter</a></li>
                </ul>
            </header>
            <section className="LoggedIn-content">
                {children}
            </section>
        </div>
    );
}

export default LoggedIn;
