import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext"; // Importar el contexto
import axios from "axios";
import "../auth/auth.css";

const UserInterests = () => {
  const { id } = useContext(UserContext); 
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/login"); 
    } else {
      fetchInterests();
    }
  }, [id]);

  const fetchInterests = async () => {
    try {
      const response = await axios.get("http://localhost:8090/interests/");
      console.log("Intereses cargados:", response.data); 
      setInterests(response.data);
    } catch (error) {
      setErrorMessage("No se pudieron cargar los intereses. Intenta más tarde.");
    }
  };

  const handleInterestToggle = (interestId) => {
    console.log("Interés clickeado, ID:", interestId); 
    setSelectedInterests((prev) => {
      const updated = prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId];

      console.log("Intereses seleccionados ahora:", updated);

      return updated;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {

      console.log("Intereses seleccionados para enviar:", selectedInterests);


      const queryParams = selectedInterests.join(","); 


      const url = `http://localhost:8090/interests/${id}?=${queryParams}`;


      console.log("URL generada:", url);


      const bodyData = selectedInterests; 

      await axios.post(url, bodyData); 

      navigate("/"); 
    } catch (error) {
      console.error("Error al guardar intereses:", error.response || error);
      setErrorMessage("No se pudieron guardar los intereses. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Bienvenido</h1>
        <h4>¿Qué temáticas te interesan más?</h4>
        <div className="interests-container">
          {interests.map((interest) => (
            <div
              key={interest.id}
              className={`interest-item ${selectedInterests.includes(interest.id) ? "selected" : ""}`}
              onClick={() => handleInterestToggle(interest.id)}
            >
              {interest.name}
            </div>
          ))}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleSubmit} className="btn btn-login w-100" disabled={loading}>
          {loading ? "Cargando..." : "FINALIZAR REGISTRO"}
        </button>

        <button
            type="button"
            className="btn btn-register w-100 mt-3"
            onClick={() => navigate("/")}
          >
            OMITIR
          </button>
      </div>
    </div>
  );
};

export default UserInterests;
