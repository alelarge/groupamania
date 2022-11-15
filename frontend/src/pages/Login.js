import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    useLoginMutation,
} from '../services/user'
import { Link } from "react-router-dom";
import NotConnected from "../layouts/NotConnected";
import { useForm } from "react-hook-form";

function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [isValidCredential, setIsValidCredential] = useState(true);
    // const [email, updateEmail] = useState("john@doe.com");
    // const [password, updatePassword] = useState("password");
    const [login, { isSuccess }] = useLoginMutation();
    useEffect(() => {
        console.log('isSuccess', isSuccess);
        if (isSuccess) {
            navigate('/homepage');
        }
    });

    const onSubmit = (data) => {
        login({
            password: data.password,
            email: data.email,
        }).then(e => {
            if (e.error) {
                setIsValidCredential(false);
            }
        });
    };

    return (
        <NotConnected>
            <div className="Login">
                <div className="card">
                    <div className="card-header text-center">
                        <h2>Login</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="Login-form">
                            <div className="mb-3 text-start">
                                <label className="form-label">Adresse email :</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Tapez votre email"
                                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                />
                                {errors.email && <span className="invalid-input">Ce champ est requis</span>}
                            </div>
                            <div className="mb-3 text-start">
                                <label>Mot de passe :</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Tapez votre mot de passe"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <span className="invalid-input">Ce champ est requis</span>}
                            </div>
                            <input className="btn btn-primary" type="submit" value="Envoyer" />
                            {!isValidCredential && <div className="invalid-input">Email ou mot de passe non valide</div>}
                        </form>
                    </div>
                </div>
                <Link to="/create-account">Créer un compte</Link>
            </div>
        </NotConnected>
    );
}

export default Login;
