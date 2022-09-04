import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import {
    logout,
  } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


function LoggedIn({ children }) {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    console.log('auth', auth);

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
        <div className="LoggedIn">
            <header className="LoggedIn-header">
                <nav className="LoggedIn__nav">
                    <ol>
                        <li className="LoggedIn__nav__item"><a href="#">Groupomania</a></li>
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
