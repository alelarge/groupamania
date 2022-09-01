import { useState } from "react";
import { Link } from "react-router-dom";
import NotConnected from "../layouts/NotConnected";
const axios = require("axios").default;

function SignUp() {
  const [lastName, updateLastName] = useState("");
  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [passwordConfirmed, updatePasswordConfirmed] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    // Appeler l'API et gérer la réponse
    // Make a request for a user with a given ID
    axios
      .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/signup`,
          {
            password: password,
            email: email,
            firstname: name,
            lastname: lastName
          }
        )
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
};

  return (
    <NotConnected>
      {/* <div className="Login"> */}
      <div className="SignUp">
        <form onSubmit={handleSubmit} className="SignUp-form">
          <label>
            Prénom :
            <input
              type="text"
              onChange={(e) => {
                updateName(e.target.value);
              }}
              value={name}
              placeholder="Tapez votre nom"
            />
          </label>

          <label>
            Nom :
            <input
              type="text"
              onChange={(e) => {
                updateLastName(e.target.value);
              }}
              value={lastName}
              placeholder="Tapez votre prénom"
            />
          </label>

          <label>
            Adresse email :
            <input
              type="email"
              onChange={(e) => {
                updateEmail(e.target.value);
              }}
              value={email}
              placeholder="Tapez votre adresse mail"
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

          <label>
            Confirmer le mot de passe :
            <input
              type="password"
              onChange={(e) => {
                updatePasswordConfirmed(e.target.value);
              }}
              value={passwordConfirmed}
              placeholder="Confirmez votre mot de passe"
            />
          </label>

          <input type="submit" value="Envoyer" />
        </form>
      </div>
      <Link to="/login">Se connecter</Link>
    </NotConnected>
  );
}

export default SignUp;
