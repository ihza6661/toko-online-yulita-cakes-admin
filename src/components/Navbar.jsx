import { useState, useRef, useEffect, useContext } from "react";
import { FiChevronDown, FiUser, FiLogOut, FiMenu } from "react-icons/fi";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = ({ setIsSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { handleLogout, user } = useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full top-0 z-50 bg-white shadow-md h-16">
      <div className="flex items-center justify-between px-4 py-3 h-full">
        {/* Tombol Menu Mobile */}
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex items-center flex-1 justify-center md:justify-start">
          <Link to="/">
            <img
              className="h-12 w-12"
              src={assets.as_denim_logo}
              alt="AS Denim Logo"
            />
          </Link>
        </div>

        {/* Menu Profil */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-1 focus:outline-none"
          >
            {/* Tampilkan nama admin jika ada, default ke "Admin" */}
            <span className="text-gray-700">{user?.name || "Admin"}</span>
            <FiChevronDown className="w-5 h-5 text-gray-600" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-xl">
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                <FiUser className="mr-2" />
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FiLogOut className="mr-2" />
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
