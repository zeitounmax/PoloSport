import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../images/logo RGB Original Digital.png";
import { useAuth } from "../contexts/AuthContext";
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUserCog } from "react-icons/fa"; // Icônes pour la recherche, la connexion et l'administration

function Header() {
  const navigate = useNavigate();
  const { token, setToken, isAdmin, setIsAdmin } = useAuth();
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
  };

  const handleSearchIconClick = () => {
    setSearchVisible(!searchVisible);
    if (!searchVisible) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 100); // Focus sur l'input après l'affichage
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setToken(null);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <header className="bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="mx-auto">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo Origins Digital"
              className="w-32 md:w-48"
            />
          </Link>
        </div>

        {/* Contenu du Header */}
        <div className="flex items-center space-x-4">
          {/* Icône de recherche */}
          <button
            onClick={handleSearchIconClick}
            className="p-2 bg-blue-500 text-white rounded"
          >
            <FaSearch />
          </button>

          {/* Barre de recherche */}
          {searchVisible && (
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="text"
                placeholder="Rechercher"
                value={search}
                onChange={handleSearchChange}
                ref={inputRef}
                className="p-2 rounded"
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded"
              >
                Go
              </button>
            </form>
          )}

          {/* Bouton Connexion/Déconnexion */}
          {token ? (
            <button
              onClick={handleLogout}
              className="p-2 bg-blue-500 text-white rounded"
            >
              <FaSignOutAlt />
            </button>
          ) : (
            <Link to="/login" className="p-2 bg-blue-500 text-white rounded">
              <FaSignInAlt />
            </Link>
          )}

          {/* Bouton Administration */}
          {isAdmin && token && (
            <Link to="/admin" className="p-2 bg-blue-500 text-white rounded">
              <FaUserCog />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
