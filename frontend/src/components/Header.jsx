import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../images/logo RGB Original Digital.png";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { token, setToken, isAdmin, setIsAdmin } = useAuth();
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState("");
  const searchButtonRef = useRef(null);
  const inputRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
  };

  const handleClickOutside = (event) => {
    if (
      searchButtonRef.current &&
      !searchButtonRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleLogout = () => {
    setToken(null);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-4">
      {/* Logo centré */}
      <div className="mx-auto">
        <Link to="/">
          <img src={Logo} alt="Logo Origins Digital" className="w-32 md:w-48" />
        </Link>
      </div>

      {/* Zone de droite avec les boutons */}
      <div className="flex items-center space-x-4">
        {/* Zone de recherche */}
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
        <button
          ref={searchButtonRef}
          onClick={handleButtonClick}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Rechercher
        </button>

        {/* Bouton Connexion/Déconnexion */}
        {token ? (
          <button
            onClick={handleLogout}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Déconnexion
          </button>
        ) : (
          <Link to="/login" className="p-2 bg-blue-500 text-white rounded">
            Connexion
          </Link>
        )}

        {/* Bouton Administration */}
        {isAdmin && token && (
          <Link to="/admin" className="p-2 bg-blue-500 text-white rounded">
            Administration
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
