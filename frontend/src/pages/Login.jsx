import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const { setToken, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/login`,
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setToken(data.token);
        setIsAdmin(data.is_admin);
        navigate("/");
      });
  };

  return (
    <div className="header-form flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md max-w-md w-full"
      >
        <div className="formulaire">
          <p className="text-2xl font-semibold mb-6">Connectez-vous</p>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              className="mt-2 p-3 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              className="mt-2 p-3 w-full border rounded-md"
            />
          </div>

          <div className="controls mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
            >
              Connexion
            </button>
          </div>

          <div className="links text-center">
            <Link
              className="inscription text-blue-500 hover:underline"
              to="/inscription"
            >
              Inscription
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
