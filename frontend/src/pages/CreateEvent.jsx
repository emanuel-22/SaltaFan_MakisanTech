import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateEvent.css";
import "../globals.css";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const organizerId = Number(localStorage.getItem("id"));
const organizerName = String(localStorage.getItem("name"));

const EventForm = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: "",
    subtitle: "",
    description: "",
    age: false,
    accessibility: false,
    urlTicket: "",
    type: "",
    nameLocation: "",
    address: "",
    schedule: [{ date: "", startTime: "" }],
    category: "",
    organizer: {
      id: organizerId,
    },
    image: null,
  });

  const characterLimit = 140;
  const characterCount = eventData.subtitle.length;
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8090/events/")
      .then((response) => {
        const uniqueCategories = response.data
          .map((evento) => evento.category)
          .filter(
            (value, index, self) =>
              index === self.findIndex((cat) => cat.id === value.id)
          );
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error al cargar los eventos:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setEventData({ ...eventData, [name]: checked });
    } else if (name.includes("schedule")) {
      const index = name.split("[")[1].split("]")[0];
      const key = name.split(".")[1];
      const updatedSchedule = [...eventData.schedule];

      if (key === "startTime" || key === "endTime") {
        const [hours, minutes] = value.split(":");
        updatedSchedule[index][key] = `${hours}:${minutes}`;
      } else {
        updatedSchedule[index][key] = value;
      }

      setEventData({ ...eventData, schedule: updatedSchedule });
    } else if (name === "category") {
      const selectedCategory = categories.find((cat) => cat.id === Number(value));
      setEventData({ ...eventData, category: selectedCategory || "" });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024; // 25 MB en bytes
      if (file.size > maxSize) {
        setErrorMessage("La imagen no puede superar los 15 MB.");
        return; 
      }
      setEventData({ ...eventData, image: file });
      setErrorMessage(""); 
    }
  };

  const handleRemoveImage = () => {
    setEventData({ ...eventData, image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!eventData.image) {
      setErrorMessage("Por favor, selecciona una imagen para el evento.");
      return;
    }

    const transformedData = {
      name: eventData.name,
      subtitle: eventData.subtitle,
      description: eventData.description,
      age: eventData.age ? 18 : 0,
      edition: eventData.edition,
      accessibility: eventData.accessibility,
      urlTicket: eventData.urlTicket,
      type: eventData.type,
      location: {
        id: 1,
      },
      nameLocation: eventData.nameLocation,
      address: eventData.address,
      schedule: eventData.schedule.map((s) => ({
        date: s.date,
        time: `${s.startTime}:00`,
      })),
      category: {
        id: eventData.category.id,
      },
      organizer: {
        id: eventData.organizer.id,
      },
    };

    const formData = new FormData();
    formData.append("event", new Blob([JSON.stringify(transformedData)], { type: "application/json" }));
    formData.append("image", eventData.image);
    console.log("JSON enviado:", JSON.stringify(transformedData, null, 2));
    try {
      const response = await axios.post("http://localhost:8090/events/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Evento creado:", response.data);
      navigate("/eventos");
    } catch (error) {
      setErrorMessage("Error al crear el evento. Por favor, inténtalo de nuevo.");
      console.error("Error al enviar el evento:", error);
    }
  };

  return (
    <Container>
      <div className="full-width-header">
        <div className="header-texts">
          <h2>Nuevo Evento</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="header-buttons">
            <Button
              type="cancel"
              className="btn-register px-4"
              variant="secondary"
            >
              Cancelar
            </Button>
            <Button type="submit" className="btn-login px-4" variant="primary">
              PUBLICAR
            </Button>
          </div>
        </Form>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <Form onSubmit={handleSubmit}>
        <div className="custom-form-container">
          <div className="form-column">
            <h3>Información del Evento</h3>
            <Row>
              <Col xs={12}>
                <Form.Group className="custom-form-group">
                  <Form.Label>Nombre del Evento</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={eventData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="custom-form-group">
                  <Form.Label>Descripción resumida del evento</Form.Label>
                  <div className="description-container">
                    <Form.Control
                      as="textarea"
                      name="subtitle"
                      value={eventData.subtitle}
                      onChange={handleChange}
                      className="description-textarea"
                      maxLength={characterLimit}
                    />
                    <div className="char-count">
                      {characterCount} / {characterLimit}
                    </div>
                  </div>
                </Form.Group>
                <Form.Group className="custom-form-group">
                  <Form.Label>Organizado por</Form.Label>
                  <Form.Control
                    type="text"
                    name="organizer"
                    value={organizerName || ''}
                    readOnly
                    className="readonly-field"
                  />
                </Form.Group>
                <h3>Datos del Evento</h3>
                <Form.Group className="custom-form-group">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={eventData.category.id || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="custom-form-group">
                  <Form.Label>Tipo de evento</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={eventData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="¿Es un espacio accesible?"
                  name="accessibility"
                  checked={eventData.accessibility}
                  onChange={handleChange}
                />
                <Form.Check
                  className="pb-5"
                  type="checkbox"
                  label="¿Es apto para todo público?"
                  name="age"
                  checked={eventData.age}
                  onChange={handleChange}
                />
                <h3>Fecha y Hora</h3>
                <Form.Group className="custom-form-group">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="schedule[0].date"
                    value={eventData.schedule[0].date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="custom-form-group">
                  <Form.Label>Hora de comienzo</Form.Label>
                  <Form.Control
                    type="time"
                    name="schedule[0].startTime"
                    value={eventData.schedule[0].startTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <h3>Ubicación</h3>
                <Form.Group className="custom-form-group">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control
                    type="text"
                    value="Salta"
                    className="readonly-field"
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="custom-form-group">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value="Salta"
                    onChange={(e) =>
                      setEventData({ ...eventData, location: { id: 10 } })
                    }
                    readOnly
                    className="readonly-field"
                  />
                </Form.Group>
                <Form.Group className="custom-form-group">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={eventData.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="custom-form-group pb-5">
                  <Form.Label>Nombre del lugar</Form.Label>
                  <Form.Control
                    type="text"
                    name="nameLocation"
                    value={eventData.nameLocation}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <h3>Información detallada</h3>
                <Form.Group className="custom-form-group">
                  <Form.Label>Descripción del evento</Form.Label>
                  <div className="description-container">
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={eventData.description}
                      onChange={handleChange}
                      required
                      className="description-textarea"
                      maxLength={characterLimit}
                    />
                    <div className="char-count">
                      {characterCount} / {characterLimit}
                    </div>
                  </div>
                </Form.Group>
                <h3>Sobre el Organizador</h3>
                <Form.Group className="custom-form-group">
                  <Form.Label>Link de Instagram</Form.Label>
                  <Form.Control
                    type="text"
                    name="urlTicket"
                    value={eventData.urlTicket}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div className="image-column">
            <Form.Group className="custom-form-group">
              <div
                onClick={() => document.getElementById("image-input").click()}
                className={`image-upload-container ${
                  eventData.image ? "image-loaded" : ""
                }`}
              >
                {eventData.image ? (
                  <>
                    <img
                      src={URL.createObjectURL(eventData.image)}
                      alt="Vista previa"
                      className="image-preview"
                    />
                  </>
                ) : (
                  <span className="image-upload-text">
                    Agregar portada del evento
                  </span>
                )}
              </div>
              <Form.Control
                id="image-input"
                type="file"
                name="image"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </Form.Group>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default EventForm;