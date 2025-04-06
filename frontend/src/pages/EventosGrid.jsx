import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import heroevents from "../assets/img/hero-events.jpg";
import "./EventosGrid.css";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const EventosGrid = () => {
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const location = useLocation();
  const categoryFromUrl = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    axios
      .get("http://localhost:8090/events/")
      .then((response) => {
        setEventos(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((evento) => evento.category.name)),
        ];
        setCategories(uniqueCategories);
        const uniqueTypes = [
          ...new Set(response.data.map((evento) => evento.type)),
        ];
        setTypes(uniqueTypes);

        if (categoryFromUrl) {
          setSelectedCategories([categoryFromUrl]);
        }

        setFilteredEventos(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los eventos:", error);
      });
  }, [categoryFromUrl]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) {
      params.append("categories", selectedCategories.join(","));
    }
    if (dateFilter) {
      params.append("date", dateFilter);
    }
    if (selectedTypes.length > 0) {
      params.append("types", selectedTypes.join(","));
    }

    axios
      .get(`http://localhost:8090/events/filter?${params.toString()}`)
      .then((response) => {
        setFilteredEventos(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los eventos filtrados:", error);
      });
  }, [selectedCategories, selectedTypes, dateFilter]);

  const searchEventos = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = eventos.filter(
      (evento) =>
        evento.name.toLowerCase().includes(lowerQuery) ||
        evento.category.name.toLowerCase().includes(lowerQuery) ||
        evento.location.city.toLowerCase().includes(lowerQuery)
    );
    setFilteredEventos(filtered);
  };

  const debounceSearch = useCallback(debounce(searchEventos, 300), [eventos]);

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debounceSearch(newQuery);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleDateChange = (filterValue) => {
    setDateFilter((prev) => (prev === filterValue ? "" : filterValue));
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-eventscontainer position-relative">
        <img src={heroevents} alt="Eventos Hero" className="hero-events" />
        <div className="hero-overlay-events text-center position-absolute w-100 h-30 d-flex flex-column justify-content-center align-items-center">
          <form className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar eventos por nombre, categoría o ubicación..."
              value={query}
              onChange={handleQueryChange}
            />
            <button type="button" className="btn btn-hero-search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
      </div>

      {/* Filtros y Grilla */}
      <div className="d-flex">
        <div className="filters-container">
          <div className="category-filters">
            <h3>Filtros</h3>
            <h5>Temática</h5>
            {categories.map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </div>

          <div className="date-filters d-flex row">
            <h5>Filtrar por fecha</h5>
            <label className="pb-2">
              <input
                type="checkbox"
                value="Hoy"
                checked={dateFilter === "Hoy"}
                onChange={() => handleDateChange("Hoy")}
              />
              Hoy
            </label>
            <label className="pb-2">
              <input
                type="checkbox"
                value="Esta semana"
                checked={dateFilter === "Semana"}
                onChange={() => handleDateChange("Semana")}
              />
              Esta semana
            </label>
            <label className="pb-2">
              <input
                type="checkbox"
                value="Este mes"
                checked={dateFilter === "Mes"}
                onChange={() => handleDateChange("Mes")}
              />
              Este mes
            </label>
          </div>

          <div className="type-filters d-flex row">
            <h5>Tipo de evento</h5>
            {types.map((type) => (
              <label key={type} className="pb-2">
                <input
                  type="checkbox"
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="container eventos-container">
          <div className="row mx-4">
            {filteredEventos.length > 0 ? (
              filteredEventos.map((evento) => (
                <div
                  className="col-md-6 mb-4 d-flex justify-content-center"
                  key={evento.id}
                >
                  <div className="card evento-card-org mb-5">
                    <div className="position-relative">
                      <img
                        src={evento.flyer}
                        alt={evento.name}
                        className="card-img-top flyer-image-org"
                      />
                      <div className="event-date position-absolute">
                        <span>
                          {new Date(evento.schedule[0].date).getDate()}
                        </span>
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
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="icon-disponible"
                          />
                          Disponible
                        </span>
                        <span className="badge badge-category">
                          {evento.category.name}
                        </span>
                      </div>
                      <Link
                        to={`/eventos/${evento.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <h4 className="card-title">{evento.name}</h4>
                      </Link>
                      <h5 className="card-text mb-1">
                        {new Date(evento.schedule[0].date).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "long",
                          }
                        )}
                      </h5>
                      <h5 className="card-text">
                        {evento.location.city} - {evento.location.name}
                      </h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-left">
                <p className="no-events-message text-center pt-5">
                  No se encontraron eventos que coincidan con los filtros
                  seleccionados :(
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventosGrid;
