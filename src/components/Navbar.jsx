import { useState, useEffect } from "react";
import { Search, Bell, Menu, X, Globe, ChevronDown } from "lucide-react";
import logo from "../assets/logo/logo.png";

function Navbar() {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languages, setLanguages] = useState([]);


  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=languages");
        const data = await res.json();

        const langs = new Set();

        data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang) => {
              langs.add(lang);
            });
          }
        });

        setLanguages([...langs].sort());
      } catch (err) {
        console.error(err);
      }
    };

    fetchLanguages();



    const handleScroll = () => {
      setShow(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    "Home",
    "TV Shows",
    "Movies",
    "New & Popular",
    "My List",
    "Browse by Languages",
  ];

  return (
    <div className={`fixed w-full z-50 ${show ? "bg-black" : "bg-transparent"} transition-all duration-500`}>

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-4 md:px-12 lg:px-20 py-4">

        <img
          src={logo}
          alt="Netflix Logo"
          className="w-[100px] md:w-[120px] object-contain cursor-pointer"
        />

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">

          {/* Language Selector */}
          <div className="flex items-center gap-2 border border-gray-500 px-3 py-1 rounded bg-black text-white hover:border-white transition">

            {/* Globe Icon */}
            <Globe size={16} />

            {/* Select */}
            <select className="bg-transparent outline-none appearance-none cursor-pointer">
              {(languages.length ? languages : ["English"]).map((lang) => (
                <option key={lang} className="text-black">
                  {lang}
                </option>
              ))}
            </select>

            {/* Dropdown Arrow */}
            <ChevronDown size={16} />

          </div>

          {/* Sign In Button */}
          <button className="bg-red-600 px-4 py-1 rounded text-white font-semibold hover:bg-red-700">
            Sign In
          </button>

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white">
          {menuOpen ? (
            <X onClick={() => setMenuOpen(false)} />
          ) : (
            <Menu onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* BOTTOM BAR (DESKTOP ONLY) */}
      <div className="hidden md:flex justify-between items-center px-4 md:px-12 lg:px-20 py-3">

        <div className="flex items-center gap-8">
          <img
            src={logo}
            alt="Netflix Logo"
            className="w-[90px] object-contain"
          />

          <ul className="flex gap-6 text-white text-sm font-light">
            {navLinks.map((item) => (
              <li key={item} className="hover:text-gray-300 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-5 text-white">
          <Search size={20} className="cursor-pointer" />
          <Bell size={20} className="cursor-pointer" />

          <div className="flex items-center gap-1 cursor-pointer">
            <img
              className="w-8 rounded"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="profile"
            />
            <span>▼</span>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white px-6 py-4 space-y-4">
          {navLinks.map((item) => (
            <div key={item} className="border-b border-gray-700 pb-2">
              {item}
            </div>
          ))}

          <button className="bg-red-600 px-4 py-2 rounded w-full">
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;