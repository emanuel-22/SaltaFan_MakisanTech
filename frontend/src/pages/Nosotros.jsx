import React from "react";
import nosotroshero from "../assets/img/nosotroshero.jpg";
import "./Nosotros.css";

const Nosotros = () => {
  const miembros = [
    {
      nombre: "Juan Alvarez",
      descripcion: "Miembro y Organizador de Lorem Ipsum",
      imagen: "https://via.placeholder.com/330x370",
    },
    {
      nombre: "María López",
      descripcion: "Miembro y Organizadora de Lorem Ipsum",
      imagen: "https://via.placeholder.com/330x370",
    },
    {
      nombre: "Carlos Pérez",
      descripcion: "Miembro y Organizador de Lorem Ipsum",
      imagen: "https://via.placeholder.com/330x370",
    },
  ];

  const valores = [
    {
      titulo: "Respeto",
      imagen: "https://via.placeholder.com/120", 
    },
    {
      titulo: "Trabajo en Equipo",
      imagen: "https://via.placeholder.com/120",
    },
    {
      titulo: "Innovación",
      imagen: "https://via.placeholder.com/120", 
    },
  ];

  return (
    <section>
      <div className="nosotros-banner">
        <img src={nosotroshero} alt="Nosotros" className="img-fluid" />
      </div>
      <div className="nosotros-container pb-5">
        <div className="text-center">
          <h2 className="titlesnosotros fw-bold pt-5 pb-3">Nosotros</h2>
        </div>

        <div className="container pt-5">
          <div className="row justify-content-center">
            {miembros.map((miembro, index) => (
              <div className="col-md-4 text-center" key={index}>
                <div className="nosotroscard border-0">
                  <div className="card border-0">
                    <img src={miembro.imagen} alt={miembro.nombre} />
                    <div className="card-body-nosotros">
                    <h5 className="card-title-nosotros pt-2">
                      {miembro.nombre}
                    </h5>
                    <h6 className="pnosotros">{miembro.descripcion}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mt-5 pt-5">
          <div className="text-center">
            <h2 className="titlesnosotros fw-bold">Nuestra historia</h2>
          </div>
          <div className="pt-2 text-center">
            <p className="pnosotros fw-bolder pt-3">
              Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus,
              habitasse convallis luctus enim aptent praesent eu, nullam quis
              mollis vitae himenaeos ante potenti. Pellentesque primis ligula
              porttitor.
            </p>
            <p className="pnosotros fw-light pt-2">
              Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus,
              habitasse convallis luctus enim aptent praesent eu, nullam quis
              mollis vitae himenaeos ante potenti. Pellentesque primis ligula
              porttitor. Condimentum habitant fames sed erat etiam arcu eros
              dapibus mollis posuere potenti, egestas cras nibh ridiculus mattis
              dignissim auctor porttitor taciti est, enim euismod praesent at
              magna venenatis nec suspendisse cubilia viverra.
            </p>
          </div>
        </div>

        <div className="container mt-5 pt-5">
      <div className="text-center">
        <h2 className="titlesnosotros fw-bold">Valores de la comunidad</h2>
      </div>
      <div className="pt-2 text-center">
            <p className="pnosotros fw-bolder pt-3">
              Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus,
              habitasse convallis luctus enim aptent praesent eu, nullam quis
              mollis vitae himenaeos ante potenti. Pellentesque primis ligula
              porttitor.
            </p>
          </div>
      <div className="valores-container pt-3">
        {valores.map((valor, index) => (
          <div className="valores-card" key={index}>
            <img src={valor.imagen} alt={valor.titulo} />
            <h5 className="valores-card-title">{valor.titulo}</h5>
          </div>
        ))}
      </div>
      </div>
      </div>
    </section>
  );
};

export default Nosotros;
