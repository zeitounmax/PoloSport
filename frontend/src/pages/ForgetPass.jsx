import React, { useState } from "react";

function ForgetPass() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmail("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white bg-opacity-75 p-8 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6">
          Récupération du mot de passe
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-3 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPass;
