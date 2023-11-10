import { Link } from "react-router-dom";

function CategoryBar() {
  const sports = [
    { name: "Football", icon: "sports_soccer" },
    { name: "Basketball", icon: "sports_basketball" },
    { name: "Tennis", icon: "sports_tennis" },
    { name: "Natation", icon: "pool" },
    { name: "Hockey", icon: "sports_hockey" },
  ];

  return (
    <nav className="flex flex-col fixed top-0 left-0 w-20 h-full bg-black items-center md:w-20">
      {sports.map((sport) => (
        <Link
          key={sport.name}
          className="flex flex-col items-center text-white no-underline cursor-pointer py-3"
          to={`/category/${sport.name}`}
        >
          <span className="material-icons text-white text-3xl">
            {sport.icon}
          </span>
          <span className="text-xs">{sport.name}</span>
        </Link>
      ))}
    </nav>
  );
}

export default CategoryBar;
