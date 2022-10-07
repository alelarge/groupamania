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
                <div className="card">
                    <div class="card-header text-center">
                        <h2>Login</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="Login-form">
                            <div className="mb-3 text-start">
                                <label className="form-label">Adresse email :</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    onChange={(e) => {
                                        updateEmail(e.target.value);
                                    }}
                                    value={email}
                                    placeholder="Tapez votre email"
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label>Mot de passe :</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    onChange={(e) => {
                                        updatePassword(e.target.value);
                                    }}
                                    value={password}
                                    placeholder="Tapez votre mot de passe"
                                />
                            </div>
                            <input className="btn btn-primary" type="submit" value="Envoyer" />
                        </form>
                    </div>
                </div>
                <Link to="/create-account">Créer un compte</Link>
            </div>
        </NotConnected>
    );
}

export default Login;
