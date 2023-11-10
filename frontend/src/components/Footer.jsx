import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo RGB Original Digital.png";

function Footer() {
  return (
    <footer className="flex justify-between items-center dark:bg-gray-900 p-4  bg-custom-dark">
      <div className="mx-auto">
        <Link to="/">
          <img src={Logo} alt="Logo Origins Digital" className="w-30" />
        </Link>
      </div>

      <div className="flex items-center space-x-4  bg-custom-dark">
        <Link to="/about" className="text-sm text-gray-700 dark:text-gray-300">
          À propos
        </Link>
        <Link to="/contact" className="text-sm text-gray-700 dark:text-gray-300">
          Contact
        </Link>
        <Link to="/terms" className="text-sm text-gray-700 dark:text-gray-300">
          Termes et Conditions
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
