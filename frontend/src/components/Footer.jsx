import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo RGB Original Digital.png";

function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center dark:bg-gray-900 p-4 bg-custom-dark">
      <div className="md:mx-auto">
        <Link to="/">
          <img src={Logo} alt="Logo Origins Digital" className="w-30" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center md:space-x-4 mt-4 md:mt-0">
        <Link
          to="/about"
          className="text-sm text-gray-700 dark:text-gray-300 mb-2 md:mb-0"
        >
          À propos
        </Link>
        <Link
          to="/contact"
          className="text-sm text-gray-700 dark:text-gray-300 mb-2 md:mb-0"
        >
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
