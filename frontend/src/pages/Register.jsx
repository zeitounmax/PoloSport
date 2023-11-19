import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mail, setMail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
      mail,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setMail("");
        alert("Enregistrement réussi !");
      } else {
        alert("Erreur lors de l'enregistrement.");
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-75 p-8 rounded-xl shadow-md max-w-md w-full"
      >
        <p className="text-2xl font-semibold mb-6 text-center">
          Inscrivez-vous
        </p>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 p-3 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirm_password"
            className="block text-sm font-medium text-gray-600"
          >
            Confirmation du mot de passe
          </label>
          <input
            type="password"
            id="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-2 p-3 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
            className="mt-2 p-3 w-full border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
        >
          S'inscrire
        </button>

        <div className="text-center mt-4">
          <p>
            Vous avez déjà un compte ?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Connexion
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
