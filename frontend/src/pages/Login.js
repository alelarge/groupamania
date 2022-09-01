import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    useLoginMutation,
  } from '../services/user'
import { Link } from "react-router-dom";
import NotConnected from "../layouts/NotConnected";

function Login() {
    const navigate = useNavigate();
    //const auth = useSelector((state) => state.auth);
    const [email, updateEmail] = useState("john@doe.com");
    const [password, updatePassword] = useState("mikarmelle0912");
    const [login, { isSuccess }] = useLoginMutation();
    useEffect(() => {
        console.log('useEffect')
        if (isSuccess) {
            console.log('isSuccess')
            navigate('/homepage');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            password: password,
            email: email,
        });
    };

    return (
        <NotConnected>
            <div className="Login">
                <form onSubmit={handleSubmit} className="Login-form">
                    <label>
                        Adresse email :
            <input
                            type="email"
                            onChange={(e) => {
                                updateEmail(e.target.value);
                            }}
                            value={email}
                            placeholder="Tapez votre email"
                        />
                    </label>
                    <label>
                        Mot de passe :
            <input
                            type="password"
                            onChange={(e) => {
                                updatePassword(e.target.value);
                            }}
                            value={password}
                            placeholder="Tapez votre mot de passe"
                        />
                    </label>
                    <input type="submit" value="Envoyer" />
                </form>
                <Link to="/create-account">Créer un compte</Link>
            </div>
        </NotConnected>
    );
}

export default Login;
