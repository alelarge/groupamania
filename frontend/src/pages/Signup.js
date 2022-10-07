import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import {
  useSignupMutation,
} from '../services/user'
import NotConnected from "../layouts/NotConnected";

function SignUp() {
  const navigate = useNavigate();
  const [lastName, updateLastName] = useState("");
  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [passwordConfirmed, updatePasswordConfirmed] = useState("");
  const [signup, { isSuccess }] = useSignupMutation();
  useEffect(() => {
    console.log('useEffect')
    if (isSuccess) {
      console.log('isSuccess')
      navigate('/login');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    signup({
      password: password,
      email: email,
      firstname: name,
      lastname: lastName
    });
  };

  return (
    <NotConnected>
      <div className="Signup">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="Signup-form">
              <div class="mb-3 text-start">
                <label className="form-label">Prénom :</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    updateName(e.target.value);
                  }}
                  value={name}
                  placeholder="Tapez votre nom"
                />
              </div>
              <div class="mb-3 text-start">
                <label className="form-label">Nom :</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    updateLastName(e.target.value);
                  }}
                  value={lastName}
                  placeholder="Tapez votre prénom"
                />
              </div>

              <div class="mb-3 text-start">
                <label>Adresse email :</label>
                <input
                  className="form-control"
                  type="email"
                  onChange={(e) => {
                    updateEmail(e.target.value);
                  }}
                  value={email}
                  placeholder="Tapez votre adresse mail"
                />
              </div>

              <div class="mb-3 text-start">
                <label>Mot de passe : </label>
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

              <div class="mb-3 text-start">
                <label>Confirmer le mot de passe :</label>
                <input
                  className="form-control"
                  type="password"
                  onChange={(e) => {
                    updatePasswordConfirmed(e.target.value);
                  }}
                  value={passwordConfirmed}
                  placeholder="Confirmez votre mot de passe"
                />
              </div>
              <input className="btn btn-primary" type="submit" value="Envoyer" />
            </form>
          </div>
        </div>
      </div>
      <Link to="/login">Se connecter</Link>
    </NotConnected>
  );
}
export default SignUp;
