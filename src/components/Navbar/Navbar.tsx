import { Link, useLocation } from "react-router-dom";
import { FaHome, FaChartLine, FaRegBuilding } from "react-icons/fa";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  const navLinks = [
    {
      to: "/",
      label: "Home",
      icon: <FaHome className="text-xl" />,
    },
    {
      to: "/portfolio",
      label: "Portfolio",
      icon: <FaChartLine className="text-xl" />,
    },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-56 flex flex-col gap-4 py-12 px-4 bg-white backdrop-blur-sm z-20 border-r border-gray-200">
      {/* Logo and Company Name */}
      <div className="flex items-center gap-3 mb-8">
        {/* Dummy Icon */}
        <FaRegBuilding className="text-3xl text-primary-500" />
        {/* Company Name */}
        <span className="text-xl font-extrabold text-black tracking-tight">Capital</span>
      </div>
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => {
          const isSelected = selected === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setSelected(link.to)}
              className={
                isSelected
                  ? "flex items-center gap-3 text-base font-medium cursor-pointer transition-colors text-primary-500 font-bold bg-primary-50 rounded"
                  : "flex items-center gap-3 text-base font-medium cursor-pointer transition-colors hover:text-primary-500 text-black"
              }
              aria-current={isSelected ? "page" : undefined}
            >
              {link.icon}
              <span className="text-base font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Navbar;
