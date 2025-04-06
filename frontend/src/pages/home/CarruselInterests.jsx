import React, { useState, useEffect, useContext } from "react";
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from "../../context/UserContext"; 
import useResponsiveCarrusel from "./hooks/useResponsiveCarrusel"; 
import axios from "axios"; 
import './CarruselEventos.css';

const CarruselInterests = () => {
  const { id } = useContext(UserContext); 
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const itemsPerPage = useResponsiveCarrusel(); 

  const groupEvents = (items, size) => {
    const groups = [];
    let i = 0;
    while (i < items.length) {
      groups.push(items.slice(i, i + size));
      i += size;
    }
    return groups;
  };

  const groupedEvents = groupEvents(events, itemsPerPage);

  useEffect(() => {
    if (!id) {
    } else {
      fetchEventsByInterests();
    }
  }, [id]);

  const fetchEventsByInterests = async () => {
    try {

      const response = await axios.get(`http://localhost:8090/events/user/${id}/interests`);
      setEvents(response.data);
    } catch (error) {
      setErrorMessage("No se pudieron cargar los eventos. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="container-section-rec">
      <h3 className="section-title-r">Eventos según tus intereses</h3>
      <Carousel>
        {groupedEvents.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="justify-content-center d-flex flex-row w-100">
              {group.map((evento) => (
                <div
                  key={evento.id}
                  className="col-12 col-sm-6 col-md-4 d-flex align-items-center justify-content-start w-auto p-3"
                >
                  <div className="card rounded-0 evento-card">
                    <div className="position-relative">
                      <img
                        src={evento.flyer}
                        alt={evento.name}
                        className="card-img-top flyer-image"
                      />
                      <div className="event-date position-absolute">
                        <span>{new Date(evento.schedule[0].date).getDate()}</span>
                        <small>
                          {new Date(evento.schedule[0].date)
                            .toLocaleString("es-ES", { month: "short" })
                            .toUpperCase()}
                        </small>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        <span className="badge me-2">
                          <FontAwesomeIcon icon={faCircle} className="icon-disponible" />
                          Disponible
                        </span>
                        <span className="badge">{evento.category.name}</span>
                      </div>
                      <Link to={`/eventos/${evento.id}`} className="text-decoration-none text-dark">
                        <h4 className="card-title">{evento.name}</h4>
                      </Link>
                      <h5 className="card-text mb-1">
                        {new Date(evento.schedule[0].date).toLocaleDateString("es-ES", { day: "numeric", month: "long" })}
                      </h5>
                      <h5 className="card-text">
                        {evento.location.city} - {evento.location.name}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarruselInterests;
