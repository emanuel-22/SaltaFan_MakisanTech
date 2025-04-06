import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "../auth/auth.css";

const Register = () => {
  const { login } = useContext(UserContext); 
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones
    if (!nombre.trim()) return setErrorMessage("El campo 'Nombre' es obligatorio.");
    if (!apellido.trim()) return setErrorMessage("El campo 'Apellido' es obligatorio.");
    if (!telefono.trim()) return setErrorMessage("El campo 'Número telefónico' es obligatorio.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setErrorMessage("Por favor ingresa un email válido.");
    if (password.trim().length < 6) return setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
    if (password !== confirmPassword) return setErrorMessage("Las contraseñas no coinciden.");

    const userData = {
      name: nombre,
      surname: apellido,
      email: email.trim(),
      password,
      phone: telefono,
    };

    try {
      const response = await axios.post("http://localhost:8090/auth/register", userData);
      console.log("Respuesta del backend:", response.data); 

      if (response.status === 200) {
        const { token, name, id } = response.data; 

        if (token && name && id) {
          localStorage.setItem("token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("id", id);  
          login(token, name, id);  

          navigate("/userinterests", { state: { id } }); 
        } else {
          setErrorMessage("No se recibió la información necesaria del servidor.");
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title mb-4">Registrate</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control" />
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} className="form-control" />
          </div>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
          </div>
          <div className="form-group">
            <label>Número telefónico</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => /^\d*$/.test(e.target.value) && setTelefono(e.target.value)}
              className="form-control"
              maxLength={12}
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
          </div>
          <div className="form-group">
            <label>Repetir contraseña</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="btn btn-login w-100" disabled={loading}>
            {loading ? "Cargando..." : "SIGUIENTE"}
          </button>

          
          <button
            type="button"
            className="btn btn-register w-100 mt-3"
            onClick={() => navigate("/login")}
          >
            INICIAR SESION CON CUENTA
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;
