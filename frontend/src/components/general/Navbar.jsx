import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import logo from "../../assets/img/logo.png";
import "./Navbar.css";
import userimg from "../../assets/img/userimg.jpg";

const Navbar = () => {
   const { name, role, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowNavbar(true);
      } else if (window.scrollY < lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${showNavbar ? "visible" : "hidden"}`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            className="logo d-inline-block align-text-top"
            alt="logo"
          />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/eventos" className="nav-link">
                Eventos
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                role="button"
                aria-expanded="false"
              >
                Temáticas
              </Link>
              <ul className="dropdown-te">
                <li className="dropdown-item  p-3">
                  <Link
                    className="link-dditem text-decoration-none p-3"
                    to="/eventos?category=Cultura%20Pop"
                  >
                    Cultura Pop
                  </Link>
                </li>
                <li className="dropdown-item border-top p-3">
                  <Link
                    className="link-dditem text-decoration-none p-3"
                    to="/eventos?category=Ciencia%20Ficción"
                  >
                    Ciencia Ficción
                  </Link>
                </li>
                <li className="dropdown-item border-top p-3">
                  <Link
                    className="link-dditem text-decoration-none p-3"
                    to="/eventos?category=Época%20Medieval"
                  >
                    Época Medieval
                  </Link>
                </li>
                <li className="dropdown-item border-top p-3">
                  <Link
                    className="link-dditem text-decoration-none p-3"
                    to="/eventos?category=Época%20Victoriana"
                  >
                    Época Victoriana
                  </Link>
                </li>
                <li className="dropdown-item border-top p-3">
                  <Link
                    className="link-dditem text-decoration-none p-3"
                    to="/eventos?category=Fantasía"
                  >
                    Fantasía
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/news" className="nav-link">
                Noticias
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/nosotros" className="nav-link">
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contacto" className="nav-link">
                Contacto
              </Link>
            </li>
          </ul>
          {name ? (
            <div className="user-info d-flex align-items-center">
              {role === "ORGANIZER" && (
                <div className="px-2">
                <button className="btn btn-login px-3" onClick={() => navigate("/create-event")}>+ EVENTO</button>
                </div>
              )}
              <span className="fw-semibold">Hola, {name}</span>
              <div className="dropdown">
                <div className="profile-pic-wrapper">
                  <img src={userimg} alt="User profile" />
                </div>
                <ul className="dropdown-user">
                  <li className="dropdown-item p-3">
                    <Link
                      className="link-dditem text-decoration-none p-3"
                      to="/myprofile"
                    >
                      Mi perfil
                    </Link>
                  </li>
                  <li className="dropdown-item border-top p-3">
                    <Link
                      className="link-dditem text-decoration-none p-3"
                      to="/help"
                    >
                      Eventos Guardados
                    </Link>
                  </li>
                  <li className="dropdown-item border-top p-3">
                    <Link
                      className="link-dditem text-decoration-none p-3"
                      to="/help"
                    >
                      Ayuda
                    </Link>
                  </li>
                  <li className="dropdown-item border-top p-3">
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="link-dditem text-decoration-none p-3"
                    >
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="btn login-btn"
              onClick={() => navigate("/login")}
            >
              INGRESAR
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
