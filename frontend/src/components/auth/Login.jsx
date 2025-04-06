import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext"; 
import "../auth/auth.css";

const Login = () => {
  const { login } = useContext(UserContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage("Por favor ingresa un correo electrónico válido.");
      return;
    }
    if (password.trim().length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8090/auth/login", {
        email: email.trim(),
        password: password,
      });

      if (response.status === 200) {
        const { token, name, id, role } = response.data;

        if (token && name && id && role) {
          login(token, name, id, role);  // Unifica el login para ambos roles
          navigate("/");  // Redirige a la página principal
          setErrorMessage("");
        } else {
          setErrorMessage("No se recibió el token, el nombre, el id o el rol.");
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  const handleDismissError = () => {
    setErrorMessage("");
    setIsSubmitted(false);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title mb-5 pb-2">Ingresa</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="always-float">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="always-float">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              disabled={loading}
            />
          </div>

          {isSubmitted && errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
              <button onClick={handleDismissError} className="error-btn" type="button">
                Aceptar
              </button>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-login w-100"
            disabled={loading}
          >
            {loading ? "Cargando..." : "INICIAR SESIÓN"}
          </button>

          <button
            type="button"
            className="btn btn-register w-100 mt-3 mb-5"
            onClick={handleRegisterClick}
          >
            CREAR CUENTA
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
