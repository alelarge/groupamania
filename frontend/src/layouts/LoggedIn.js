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
