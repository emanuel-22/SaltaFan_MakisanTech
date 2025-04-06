import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import newimage1 from "../assets/img/noticia1.jpg";
import newimage2 from "../assets/img/news2.jpg";
import newimage3 from "../assets/img/news3.jpg";
import bannerinf from "../assets/img/bannerinferiornews.jpg";
import "./NewsInfo.css";

const NewsInfo = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    axios
      .get(`http://localhost:8090/news/${id}`)
      .then((response) => {
        setNoticia(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener la noticia:", err);
        setError("No se pudo cargar la noticia.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="loading">Cargando noticia...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!noticia) {
    return <p className="error-message">Noticia no encontrada.</p>;
  }

  const firstSentenceMatch = noticia.body.match(/[^.]+./);
  const firstSentence = firstSentenceMatch
    ? firstSentenceMatch[0]
    : noticia.body;
  const remainingAfterFirstSentence = noticia.body
    .replace(firstSentence, "")
    .trim();
  const firstParagraphMatch =
    remainingAfterFirstSentence.match(/([^\n]*\n[^\n]*)/);
  const firstParagraph = firstParagraphMatch ? firstParagraphMatch[0] : "";
  const remainingAfterFirst = remainingAfterFirstSentence
    .replace(firstParagraph, "")
    .trim();
  const secondParagraphMatch = remainingAfterFirst.match(/([^\n]*\n[^\n]*)/);
  const secondParagraph = secondParagraphMatch ? secondParagraphMatch[0] : "";
  const remainingAfterSecond = remainingAfterFirst
    .replace(secondParagraph, "")
    .trim();
  const thirdParagraphMatch = remainingAfterSecond.match(/([^\n]*\n[^\n]*)/);
  const thirdParagraph = thirdParagraphMatch ? thirdParagraphMatch[0] : "";
  const remainingText = remainingAfterSecond.replace(thirdParagraph, "").trim();


  
  return (
    <div className="news-info-container">
      <div className="bannernewsinfo mt-3">
        <img src={newimage1} alt={noticia.title} className="bannerinfonews" />
        <div>
          <h1 className="main-news-title-i pt-5">{noticia.title}</h1>
          <p className="news-description-i pt-2">
            {noticia.body.split(". ")[0] + "."}
          </p>
          <div className="author-infom-i">
            <p className="author-name-i">
              Por {noticia.author?.name} {noticia.author?.surname || ""}
            </p>
            <span className="author-role">
              {noticia.author?.role || "Autor"}
            </span>
          </div>
        </div>
  <hr className="linea-separadora" />
      </div>

      <div className="main-news-card-i">
        <div className="noticia-content-i">
          <h1 className="main-news-title-i mt-0 pt-0 pb-3">{firstSentence}</h1>
          <p className="news-description-i">{firstParagraph}</p>
        </div>
        <div className="bodyimage">
          <img src={newimage2} alt="" className="mt-2" />
        </div>
      </div>

      <div className="second-paragraph-container">
        <p className="second-paragraph">{secondParagraph}</p>
      </div>

      <div className="third-paragraph-container pt-3 pb-3">
        <p className="third-paragraph fst-italic">{thirdParagraph}</p>
      </div>

      <div className="bodyimageb-container">
        <div className="bodyimageb">
          <img src={newimage3} alt="" className="mt-2" />
        </div>
        <div className="bodytext-b pt-4">
          <p className="news-description-i">{remainingText}</p>
        </div>
      </div>

      <div>
        <p className="fw-bold pt-5 text-decoration-underline">
          Mira aquí las imágenes del evento
        </p>
      </div>
      <div className="bannerinf">
        <img src={bannerinf} alt="" />
      </div>
    </div>
  );
};

export default NewsInfo;
