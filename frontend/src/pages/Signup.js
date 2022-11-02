import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import {
  useSignupMutation,
} from '../services/user'
import NotConnected from "../layouts/NotConnected";
import { useForm } from "react-hook-form";

function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [signup, { isSuccess }] = useSignupMutation();
  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  });

  const onSubmit = (data) => {
    signup({
      password: data.password,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname
    });
  };

  return (
    <NotConnected>
      <div className="Signup">
        <div className="card">
          <div className="card-header text-center">
              <h2>Signup</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="Signup-form">
              <div className="mb-3 text-start">
                <label htmlFor="inputFirstname" className="form-label">Prénom :</label>
                <input
                  className="form-control" 
                  id="inputFirstname" 
                  type="text"
                  placeholder="Tapez votre prénom"
                  {...register("firstname", { required: true })}
                />
                {errors.firstname && <span className="invalid-input">Ce champ est requis</span>}
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="inputLastname" className="form-label">Nom :</label>
                <input
                  className="form-control"
                  id="inputLastname"
                  type="text"
                  placeholder="Tapez votre nom"
                  {...register("lastname", { required: true })}
                />
                 {errors.lastname && <span className="invalid-input">Ce champ est requis</span>}
              </div>

              <div className="mb-3 text-start">
                <label htmlFor="inputemail" className="form-label">Adresse email :</label>
                <input
                  className="form-control"
                  id="inputemail"
                  type="email"
                  placeholder="Tapez votre adresse mail"
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                  {errors.email && <span className="invalid-input">Ce champ est requis</span>}

              </div>

              <div className="mb-3 text-start">
                <label htmlFor="inputPassword" className="form-label">Mot de passe : </label>
                <input
                  className="form-control"
                  id="inputPassword"
                  type="password"
                  placeholder="Tapez votre mot de passe"
                  {...register("password", { required: true })}
                />
                {errors.password && <span className="invalid-input">Ce champ est requis</span>}

              </div>

              <div className="mb-3 text-start">
                <label htmlFor="inputPasswordConfirmed" className="form-label">Confirmer le mot de passe :</label>
                <input
                  className="form-control"
                  id="inputPasswordConfirmed"
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  {...register("passwordConfirmed", { 
                    required: true,
                    validate: (value) => {
                      if (watch('password') != value) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />
                {errors.passwordConfirmed && <span className="invalid-input">Les deux champs doivent être identiques</span>}

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
