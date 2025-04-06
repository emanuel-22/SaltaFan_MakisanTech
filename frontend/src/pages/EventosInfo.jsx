import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import Mapa from "../components/general/Mapa";
import "./EventosInfo.css";
import organizerimg from "../assets/img/organizer.jpg";
import CarruselOrganizador from "./CarruselOrganizador";
import CommentInput from "./CommentInput";

const EventosInfo = () => {
  const { id } = useParams();
  const [eventos, setEventos] = useState([]);
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/events/organizer/${id}`
        );
        setEventos(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEventos();
  }, []);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/events/${id}`);
        setEvento(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id]);

  if (loading) {
    return <p>Cargando evento...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!evento) {
    return <p>No se encontró información del evento.</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const monthsOfYear = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ${day} de ${month} de ${year}.`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const timeParts = timeString.split(":");
    if (timeParts.length === 3) {
      let hours = timeParts[0];
      let minutes = timeParts[1];
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${minutes}`;
    } else {
      return "Hora inválida";
    }
  };

  return (
    <div className="container-info">
      <div className="flyer-container">
        <img
          src={evento.flyer}
          alt={`Flyer del evento ${evento.name}`}
          className="event-flyer"
        />
        <div className="info-container">
          <h1 className="info-title">{evento.name}</h1>
          <p className="event-descrip">{evento.description}</p>
          <div className="organizer-info">
            <img
              src={organizerimg}
              alt="Logo del organizador"
              className="organizer-logo"
            />
            <div>
              <p className="organizer-name">
                Organizado por Warmy Producciones
              </p>
              <span className="edition-badge">3ª Edición</span>
            </div>
          </div>
        </div>
      </div>

      <div className="event-details">
        <div className="detail-item">
          <div className="icon-detail-container">
            <i className="bi bi-ticket-perforated"></i>
          </div>
          <div className="detail-text">
            <div className="detail-text-h">Evento</div>
            <div>Fantasía</div>
          </div>
        </div>
        <div className="detail-item">
          <div className="icon-detail-container">
            <i className="bi bi-geo-alt"></i>
          </div>
          <div className="detail-text">
            <div className="detail-text-h">{`${evento.location.name}`}</div>
            <div>{`${evento.location.address}, ${evento.location.city}`}</div>
          </div>
        </div>
        <div className="detail-item">
          <div className="icon-detail-container">
            <i className="bi bi-person-wheelchair"></i>
          </div>
          <div className="detail-text">
            <div className="detail-text-h">Espacio</div>
            <div>Accesible</div>
          </div>
        </div>
        <div className="detail-item">
          <div className="icon-detail-container">
            <i className="bi bi-people"></i>
          </div>
          <div className="detail-text">
            <div className="detail-text-h">Edad Minima</div>
            <div>+18 años</div>
          </div>
        </div>
      </div>

      <div className="schedule-info">
        <h1 className="mb-3">Fecha y Hora</h1>
        {evento.schedule.map((item, index) => {
          const formattedDate = formatDate(item.date);
          return (
            <div key={index} className="d-flex align-items-center mb-2">
              <i className="bi bi-calendar me-2"></i>
              <span>{`${formattedDate}`}</span>
            </div>
          );
        })}
        {evento.schedule.map((item, index) => {
          const formattedTime = formatTime(item.time);
          return (
            <div key={`time-${index}`} className="d-flex align-items-center">
              <i className="bi bi-clock me-2"></i>
              <span>{`${formattedTime}`}</span>
            </div>
          );
        })}
      </div>

      {/* Ubicación */}
      <div className="map-container row">
        <div className="col-md-6">
          <h1>Ubicación</h1>
          <p>{`${evento.location.name}, ${evento.location.address}`}</p>
          <p>{`${evento.location.city}, ${evento.location.province}`}</p>
        </div>
        <div className="col-md-6">
          <Mapa direccion={evento.location.address} />
        </div>
      </div>
      <div className="mas-info text-start w-50">
        <h1>Información del Evento</h1>
        <p>
          ¡No te podés perder este evento GRATUITO que se celebra a nivel
          mundial! 🎉Únete a los fans de Sailor Moon este 4 de enero en Córdoba
          148, de 19:00 a 00:00, y disfruta de una noche mágica llena de
          sorpresas. 🌙 Proyección especial: Revive la magia de Sailor Crystal
          mientras hacemos la previa para el esperado estreno de Sailor Cosmos
          en agosto por Netflix. 🌟 Stands temáticos: Encuentra productos únicos
          y memorabilia que te encantarán. ☕ Cafetería temática: Disfruta de
          deliciosas opciones inspiradas en el universo de Sailor Moon. 🎤
          Juegos y karaoke: ¡Saca tu lado más divertido y canta tus canciones
          favoritas!✨ ¡Y mucho más por descubrir! 🌟 No te lo pierdas: Una
          experiencia inolvidable para todos los moonies. ¡Te esperamos!
        </p>
        <a className="text-dark" href="vermas">
          +Ver más
        </a>
      </div>

      <div className="mas-info-org d-flex justify-content-between">
        <div>
          <h1>Sobre el Organizador</h1>
          <div className="d-flex align-items-center">
            <img
              src={organizerimg}
              alt="Logo del organizador"
              className="organizer-logo me-3" /* me-3 agrega margen a la derecha */
            />
            <p className="organizer-name mb-0">Warmy Producciones</p>
          </div>
          <div>
            <p>
              En Warmy Producciones nos dedicamos a crear eventos cargados de
              magia, fantasía y diversión. 💫 Somos apasionados de la cultura
              pop, el anime y todo aquello que nos llena de inspiración y
              emoción.
            </p>
          </div>
          <a className="text-decoration-none text-dark" href="">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <div className="big-logo">
          <img
            src={organizerimg}
            alt="Logo grande del organizador"
            className="w-100"
          />
        </div>
      </div>

      <CarruselOrganizador eventos={eventos} />

      <CommentInput eventId={id} />
    </div>
  );
};

export default EventosInfo;
