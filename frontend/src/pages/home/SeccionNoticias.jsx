import React from "react";
import "./SeccionNoticias.css";
import noticia1 from "../../assets/img/noticia1.jpg";
import noticia2 from "../../assets/img/noticia2.jpg";
import noticia3 from "../../assets/img/noticia3.jpg";

const SeccionNoticias = () => {
  return (
    <section>
      <h3 className="section-title">Noticias</h3>
      <div className="container-noticias">
        <div className="row">
          {/* Noticia principal a la izquierda */}
          <div className="col-md-5">
            <div className="card-noticias">
              <img src={noticia1} className="noticia-img" alt="1800" />
              <div className="noticias-body">
                <h4 className="noticias-titulo">
                  Mira un poco lo que fue la primera edición de "Viaje a 1800",
                  un evento inspirado en Bridgerton
                </h4>
                <p className="noticias-descripcion">
                  El evento realizado en el Centro Cultural América, fue todo un
                  éxito y nos dejó una gran cantidad de momentos inolvidables y
                  experiencias únicas.
                </p>
                <div className="autor pb-4">
                  <div className="autor-info">
                    <span className="autor-nombre">Por Juana Rodriguez</span>
                    <br />
                    <span className="autor-rol">Creadora de Viaje a 1800</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Noticias secundarias a la derecha */}
          <div className="col-md-7">
            <div className="noticias-secundarias">
              <div className="card-noticias-s d-flex align-items-start">
                <img
                  src={noticia2}
                  className="noticia-img-lateral"
                  alt="Comic-Con"
                />
                <div className="noticias-body d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="noticias-titulo">
                      El espíritu del Comic-Con llega a Salta
                    </h4>
                    <p className="noticias-s-descripcion">
                      Fanáticos del cómic y la cultura geek se preparan para un
                      evento inspirado en el icónico Comic-Con internacional.
                    </p>
                  </div>
                  <div className="autor">
                    <div className="autor-info">
                      <span className="autor-nombre">Por Lorenzo Gatti</span>
                      <br />
                      <span className="autor-rol">Creador de Lorem Ipsum</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-noticias-s d-flex align-items-start">
                <img
                  src={noticia3}
                  className="noticia-img-lateral"
                  alt="Medieval"
                />
                <div className="noticias-body d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="noticias-titulo">
                      Magia, Fantasía y Tradición. Así Fue el IX Mercado
                      Medieval
                    </h4>
                    <p className="noticias-s-descripcion">
                      Un fin de semana lleno de espectáculos, combates
                      históricos y artesanías.
                    </p>
                  </div>
                  <div className="autor">
                    <div className="autor-info">
                      <span className="autor-nombre">Por Javier Mendez</span>
                      <br />
                      <span className="autor-rol">Creador de E. Medieval</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionNoticias;
