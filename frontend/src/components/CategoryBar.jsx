import React, { useState } from "react";
import { Link } from "react-router-dom";

function CategoryBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sports = [
    { name: "Football", icon: "sports_soccer" },
    { name: "Basketball", icon: "sports_basketball" },
    { name: "Tennis", icon: "sports_tennis" },
    { name: "Natation", icon: "pool" },
    { name: "Hockey", icon: "sports_hockey" },
  ];

  return (
    <div>
      {/* Bouton du Menu Burger */}
      <button
        className="md:hidden fixed top-5 left-5 z-20 text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="material-icons">{isMenuOpen ? "close" : "menu"}</span>
      </button>

      {/* Navigation Bar */}
      <nav
        className={`flex flex-col fixed top-0 left-0 w-20 h-full bg-black items-center z-10 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0 mt-12" : "-translate-x-full mt-0"
        } md:translate-x-0 md:mt-0`}
      >
        {sports.map((sport) => (
          <Link
            key={sport.name}
            to={`/category/${sport.name}`}
            className="flex flex-col items-center text-white no-underline py-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="material-icons text-3xl">{sport.icon}</span>
            <span className="text-xs mt-2">{sport.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default CategoryBar;
