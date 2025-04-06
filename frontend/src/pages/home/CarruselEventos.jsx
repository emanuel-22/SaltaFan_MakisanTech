import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CarruselEventosPopulares from "./CarruselEventosPopulares";
import CarruselEventosRecientes from "./CarruselEventosRecientes";
import CarruselInterests from "./CarruselInterests"; 
import SeccionNoticias from "./SeccionNoticias";
import { UserContext } from "../../context/UserContext"; 
import "./CarruselEventos.css";

const CarruselEventos = () => {
  const { id } = useContext(UserContext); 
  const [eventosPopulares, setEventosPopulares] = useState([]);
  const [eventosRecientes, setEventosRecientes] = useState([]);
  const [hasSelectedInterests, setHasSelectedInterests] = useState(false); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responsePopulares = await axios.get("http://localhost:8090/events/");
        const responseRecientes = await axios.get("http://localhost:8090/events/");

        console.log("Eventos populares cargados:", responsePopulares.data);
        console.log("Eventos recientes cargados:", responseRecientes.data);

        setEventosPopulares(responsePopulares.data);
        setEventosRecientes(responseRecientes.data);

        const responseInterests = await axios.get(`http://localhost:8090/interests/${id}`);
        setHasSelectedInterests(responseInterests.data.length > 0); 
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
      }
    };

    fetchEvents();
  }, [id]);

  if (!eventosPopulares.length || !eventosRecientes.length) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div className="full-width-section">
      {hasSelectedInterests && (
        <div className="full-width-section">
          <div className="container-shadow">
            <CarruselInterests />
          </div>
        </div>
      )}

        <div className="container-shadow">
          <CarruselEventosPopulares eventos={eventosPopulares} />
        </div>
      </div>

      <div className="container-noshadow">
        <CarruselEventosRecientes eventos={eventosRecientes} />
        <SeccionNoticias />
      </div>
    </div>
  );
};

export default CarruselEventos;
