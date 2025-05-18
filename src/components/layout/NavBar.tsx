import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContent } from "../../context/ContentfulProvider";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle('menu-open', !menuOpen);
  };
  
  const handleNavClick = () => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setMenuOpen(false);
        document.body.classList.remove('menu-open');
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove('menu-open');
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  }, [location]);

  const content = useContent();
  if (!content) return <p>Loading...</p>;
  const navbarContent = content.header;

  return (
    <header>
      <div 
        className={`mobile-menu-backdrop ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <nav>
        <div className="logo container">
          <img src={navbarContent.logo} alt="SmartHive Logo" loading="lazy" />
        </div>
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          role="button"
          tabIndex={0}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "active" : ""}>
          <li>
            <Link
              to="/"
              onClick={handleNavClick}
              aria-label={navbarContent.homeLink}
              className={location.pathname === "/" ? "active" : ""}
            >
              {navbarContent.homeLink}
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={handleNavClick}
              aria-label={navbarContent.aboutLink}
              className={location.pathname === "/about" ? "active" : ""}
            >
              {navbarContent.aboutLink}
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={handleNavClick}
              aria-label={navbarContent.contactLink}
              className={location.pathname === "/contact" ? "active" : ""}
            >
              {navbarContent.contactLink}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
