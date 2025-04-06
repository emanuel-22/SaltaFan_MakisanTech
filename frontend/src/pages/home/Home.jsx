import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import hero from "../../assets/img/hero.jpg";
import CarruselEventos from "./CarruselEventos";

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    axios
      .get("http://localhost:8090/events/")
      .then((response) => {
        setEventos(response.data); 
      })
      .catch((error) => {
        console.error("Error al cargar los eventos:", error);
      });
  }, []); 

  const handleMouseDown = (e) => {
    isDragging.current = true;
    carouselRef.current.classList.add("active");
    carouselRef.current.style.cursor = "grabbing"; 
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    carouselRef.current.classList.remove("active");
    carouselRef.current.style.cursor = "grab"; 
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    carouselRef.current.classList.remove("active");
    carouselRef.current.style.cursor = "grab"; 
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 3; 


    carouselRef.current.scrollLeft = scrollLeft.current - walk;
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    if (carouselRef.current.scrollLeft < 0) {
      carouselRef.current.scrollLeft = 0;
    } else if (carouselRef.current.scrollLeft > maxScroll) {
      carouselRef.current.scrollLeft = maxScroll;
    }
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(selectedFilter === filter ? null : filter);
  };

  const eventosFiltrados = useMemo(() => {
    if (selectedFilter) {
      return eventos.filter((evento) =>
        evento.category.includes(selectedFilter) 
      );
    }
    return eventos;
  }, [eventos, selectedFilter]); 

  return (
    <div>
      <section id="hero-section">
        <img src={hero} className="hero" alt="hero" />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>
              Enterate de
              los <br />
              mejores eventos<br />
              temáticos en Salta
            </h1>
          </div>
        </div>
      </section>

      {/* Carrusel de Eventos */}
      <CarruselEventos/>
    </div>
  );
};

export default Home;
