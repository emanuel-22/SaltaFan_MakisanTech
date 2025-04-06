import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./News.css";
import noticia1 from "../assets/img/news1.jpg";
import newimage1 from "../assets/img/noticia1.jpg";
import noticia2 from "../assets/img/noticia3.jpg";

const News = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8090/news/")
      .then((response) => {
        setNoticias(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener noticias:", err);
        setError("No se pudieron cargar las noticias.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando noticias...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const renderAuthor = (author) => {
    if (author && typeof author === "object") {
      return `${author.name || "Nombre desconocido"} ${
        author.surname || "Apellido desconocido"
      }`;
    }
    return author || "lorem ipsum";
  };

  const groupNoticias = (noticias) => {
    let groupedNoticias = [];
    let tempArray = [];

    noticias.forEach((noticia, index) => {
      if (index % 6 === 0 && index !== 0) {
        groupedNoticias.push(tempArray);
        tempArray = [];
      }
      tempArray.push(noticia);
    });

    if (tempArray.length) {
      groupedNoticias.push(tempArray);
    }

    return groupedNoticias;
  };

  const groupedNoticias = groupNoticias(noticias);

  return (
    <section className="news-container">
      <div className="noticias-wrapper pt-5 mt-5">
        {groupedNoticias.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="noticias-row main-news-row">
              {group[0] && (
                <div className="col-md-12">
                  <div className="noticia-card main-news-card">
                    <Link to={`/news/${group[0].id}` }>
                      <img
                        src={newimage1}
                        className="noticia-image main-image"
                        alt={group[0]?.title}
                      />
                    </Link>
                    <div className="noticia-content">
                      <Link to={`/news/${group[0].id}`} style={{ textDecoration: "none", color: "black" }}>
                        <h4 className="noticia-title main-news-title">
                          {group[0]?.title}
                        </h4>
                      </Link>
                      <p className="noticia-description main-news-description">
                        {group[0]?.description}
                      </p>
                      <div className="author-infom pb-4">
                        <div className="author-details">
                          <span className="author-name">
                            Por {renderAuthor(group[0]?.author)}
                          </span>
                          <br />
                          <span className="author-role main-news-role">
                            {group[0]?.role || "Lorem ipsum"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="noticias-row secondary-news-row pt-5">
              {group.slice(1, 3).map((noticia, index) => (
                <div className="col-md-6" key={index}>
                  <div className="noticia-card secondary-news-card">
                  <Link to={`/news/${noticia.id}`}>
                      <img
                        src={noticia1}
                        className="noticia-image secondary-image"
                        alt={noticia.title}
                      />
                    </Link>
                    <div className="noticia-content">
                    <Link to={`/news/${noticia.id}`} style={{ textDecoration: "none", color: "black" }}>
                        <h4 className="noticia-title secondary-news-title">
                          {noticia.title}
                        </h4>
                      </Link>
                      <p className="noticia-description secondary-news-description">
                        {noticia.description}
                      </p>
                      <div class="author-info-container">
                        <div className="author-infos">
                          <div className="author-details">
                            <span className="author-name">
                              Por {renderAuthor(noticia.author)}
                            </span>
                            <br />
                            <span className="author-role secondary-news-role">
                              {noticia.role || "Lorem ipsum"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="noticias-row tertiary-news-row pt-5">
              {group.slice(3, 6).map((noticia, index) => (
                <div className="col-md-4" key={index}>
                  <div className="noticia-card tertiary-news-card">
                  <Link to={`/news/${noticia.id}`}>
                      <img
                        src={noticia2}
                        className="noticia-image tertiary-image"
                        alt={noticia.title}
                      />
                    </Link>
                    <div className="noticia-content">
                    <Link to={`/news/${noticia.id}`} style={{ textDecoration: "none", color: "black" }}>
                        <h4 className="noticia-title tertiary-news-title">
                          {noticia.title}
                        </h4>
                      </Link>
                      <p className="noticia-description tertiary-news-description">
                        {noticia.description}
                      </p>
                      <div class="author-info-container">
                        <div className="author-info">
                          <div className="author-details">
                            <span className="author-name">
                              Por {renderAuthor(noticia.author)}
                            </span>
                            <br />
                            <span className="author-role tertiary-news-role">
                              {noticia.role || "Lorem ipsum"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
